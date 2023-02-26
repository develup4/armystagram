import { gql } from 'apollo-boost';

export const GET_MEMBERS = gql`
  {
    getMembers {
      username
      profile
    }
  }
`;
