import { gql } from 'apollo-boost';

export const LOG_IN = gql`
  mutation requestLogin($email: String!, $password: String!) {
    requestLogin(email: $email, password: $password)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;
