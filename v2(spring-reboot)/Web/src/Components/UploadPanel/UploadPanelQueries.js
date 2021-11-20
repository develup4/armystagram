import { gql } from 'apollo-boost';

export const UPLOAD = gql`
  mutation upload(
    $caption: String!
    $files: [String!]!
    $hashtags: [String]
  ) {
    upload(caption: $caption, files: $files, hashtags: $hashtags) {
      id
    }
  }
`;
