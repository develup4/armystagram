import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { ScrollView } from 'react-native';
import UserProfile from '../../../components/UserProfile';

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
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

export default ({ navigation, route }) => {
  const { params } = route;
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: params.username },
  });

  navigation.setOptions({
    headerTitle: params.username,
  });

  return (
    <ScrollView>
      {data && data.seeUser && <UserProfile {...data.seeUser} />}
    </ScrollView>
  );
};
