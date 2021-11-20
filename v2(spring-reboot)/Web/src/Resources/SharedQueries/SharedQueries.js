import { gql } from 'apollo-boost';

export const IS_LOGIN = gql`
  {
    isLogin @client
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const ME = gql`
  {
    me {
      username
      email
      profile
    }
  }
`;

export const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

export const SEE_FILTERED_POSTS = gql`
  query seeFilteredPosts(
    $all: Boolean!
    $popular: Boolean!
    $liked: Boolean!
    $follower: Boolean!
    $member: Boolean!
    $memberName: String
  ) {
    seeFilteredPosts(
      all: $all
      popular: $popular
      liked: $liked
      follower: $follower
      member: $member
      memberName: $memberName
    ) {
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
