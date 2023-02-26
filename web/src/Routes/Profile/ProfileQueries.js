import { gql } from 'apollo-boost';

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

export const GET_MEMBERS = gql`
  {
    getMembers {
      username
      profile
      isFollowing
      followingMe
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const REGISTER_MOSTLIKE = gql`
  mutation registerMostLike($mostLike: String!) {
    registerMostLike(mostLike: $mostLike)
  }
`;
