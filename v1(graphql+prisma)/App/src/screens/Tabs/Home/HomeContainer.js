import React, { useState, useEffect } from 'react';
import { SEE_FILTERED_POSTS } from '../../../commons/SharedQueries';
import { useQuery } from 'react-apollo-hooks';
import Header from '../../../components/Header';
import HomePresenter from './HomePresenter';

export default ({ navigation }) => {
  const [floatIcon, setFloatIcon] = useState('md-images');
  const [filter, setFilter] = useState('ALL');

  // Selected member
  const [selectedMember, setSelectedMember] = useState('');

  // Post
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  // SEE_MEMBER_POSTS
  const {
    data: memberPosts,
    loading: loadingMemberPosts,
    refetch: memberRefetch,
  } = useQuery(SEE_FILTERED_POSTS, {
    variables: {
      all: false,
      popular: false,
      liked: false,
      follower: false,
      member: true,
      memberName: selectedMember,
    },
    skip: selectedMember === '',
  });

  useEffect(() => {
    if (!loadingMemberPosts && memberPosts) {
      setPosts(memberPosts.seeFilteredPosts);
      setFilter('');
    }
  }, [memberPosts]);

  // SEE_FILTERED_POSTS
  const {
    data: filteredPosts,
    loading: loadingFilteredPosts,
    refetch: filterRefetch,
  } = useQuery(SEE_FILTERED_POSTS, {
    variables: {
      all: filter === 'ALL',
      popular: filter === 'POPULAR',
      liked: filter === 'LIKED',
      follower: filter === 'FOLLOWER',
      member: false,
    },
    skip: filter === '',
  });

  useEffect(() => {
    if (!loadingFilteredPosts && filteredPosts) {
      setPosts(filteredPosts.seeFilteredPosts);
      setSelectedMember('');
    }
  }, [filteredPosts]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await memberRefetch();
      await filterRefetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  // Header
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header loading={loadingFilteredPosts || loadingMemberPosts} />
      ),
    });
  }, [loadingFilteredPosts, loadingMemberPosts]);

  return (
    <HomePresenter
      refreshing={refreshing}
      onRefresh={onRefresh}
      floatIcon={floatIcon}
      setFloatIcon={setFloatIcon}
      filter={filter}
      setFilter={setFilter}
      selectedMember={selectedMember}
      setSelectedMember={setSelectedMember}
      posts={posts}
    />
  );
};
