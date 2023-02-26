import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { useIsLoggedIn } from '../../../commons/AuthContext';
import Header from '../../../components/Header';
import UserProfile from '../../../components/UserProfile';

export const GET_ME = gql`
  query me {
    me {
      id
      profile
      username
      isMember
      mostLike
      following {
        id
        profile
        username
        mostLike
        followingMe
      }
      followers {
        id
        profile
        username
        mostLike
        isFollowing
      }
      isFollowing
      isSelf
      followingCount
      followersCount
      postsCount
      posts {
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
  }
`;

// TODO : LOGOUT, 프사등록

export default ({ navigation }) => {
  const isLogin = useIsLoggedIn();

  if (isLogin === false) {
    navigation.navigate('Home');
    navigation.navigate('AuthNavigation');
  }

  const { loading, data } = useQuery(GET_ME, { skip: isLogin === false });

  // Header
  useEffect(() => {
    navigation.setOptions({
      header: () => <Header loading={loading} />,
    });
  }, [loading]);

  return (
    <ScrollView>
      {!loading && data && data.me && (
        <UserProfile {...data.me} isMine={true} />
      )}
    </ScrollView>
  );
};
