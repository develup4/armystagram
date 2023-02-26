import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import {
  GET_ME,
  GET_USER,
  GET_MEMBERS,
  LOG_OUT,
  REGISTER_MOSTLIKE,
} from './ProfileQueries';
import { SEE_FILTERED_POSTS } from '../../Resources/SharedQueries/SharedQueries';
import ProfilePresenter from './ProfilePresenter';
import { toast } from 'react-toastify';

export const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { data, loading } = useQuery(GET_ME);
  const { data: members, loading: loadingMember } = useQuery(GET_MEMBERS);
  const { data: likePosts, loading: loadingLikePosts } = useQuery(
    SEE_FILTERED_POSTS,
    {
      variables: {
        all: false,
        popular: false,
        liked: true,
        follower: false,
        member: false,
      },
    }
  );

  const logOut = useMutation(LOG_OUT);
  const tabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ProfilePresenter
      loading={loading || loadingMember || loadingLikePosts}
      logOut={logOut}
      data={data.me}
      members={members.getMembers}
      likePosts={likePosts.seeFilteredPosts}
      selectedTab={selectedTab}
      tabChange={tabChange}
    />
  );
};

export const OtherProfile = ({
  match: {
    params: { username },
  },
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const {
    data: { me },
    loading: loadingMe,
  } = useQuery(GET_ME);
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const { data: likePosts, loading: loadingLikePosts } = useQuery(
    SEE_FILTERED_POSTS,
    {
      variables: {
        all: false,
        popular: false,
        liked: true,
        follower: false,
        member: false,
      },
    }
  );

  const mostLikeMutation = useMutation(REGISTER_MOSTLIKE, {
    variables: { mostLike: username },
  });

  const registerMostLike = () => {
    try {
      mostLikeMutation();
      toast.success('최애멤버로 등록했어요❣');
    } catch (e) {
      toast.error(e);
    }
  };

  const tabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ProfilePresenter
      loading={loading || loadingMe || loadingLikePosts}
      data={data.seeUser}
      me={me}
      likePosts={likePosts.seeFilteredPosts}
      registerMostLike={registerMostLike}
      selectedTab={selectedTab}
      tabChange={tabChange}
    />
  );
};
