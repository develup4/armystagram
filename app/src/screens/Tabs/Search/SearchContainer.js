import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import useInput from '../../../components/hooks/useInput';
import NavIcon from '../../../components/NavIcon';
import SearchPresenter from './SearchPresenter';
import dimensions from '../../../styles/dimensions';
import theme from '../../../styles/theme';

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      caption
      user {
        id
        profile
        username
        isFollowing
        isMember
        isSelf
      }
      files {
        id
        url
      }
      likes {
        user {
          isMember
          username
          profile
        }
      }
      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          username
          isMember
        }
      }
      commentCount
      createdAt
    }
  }
`;

export default ({ navigation }) => {
  const searchInput = useInput();
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term: searchInput.value,
    },
    skip: searchInput.value === '',
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term: searchInput.value } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  navigation.setOptions({
    header: () => (
      <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 10 }}>
        <NavIcon name='ios-search' style={{ marginLeft: 10 }} />
        <TextInput
          style={{
            width: dimensions.width - 80,
            height: 35,
            backgroundColor: theme.lightGreyColor,
            borderRadius: 5,
            marginLeft: 10,
            textAlign: 'center',
            alignSelf: 'center',
          }}
          returnKeyType='search'
          onChangeText={searchInput.onChange}
          value={searchInput.value}
          placeholder={'검색'}
          placeholderTextColor={theme.darkGreyColor}
        />
      </View>
    ),
  });

  return (
    <SearchPresenter
      loading={loading}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={data}
    />
  );
};
