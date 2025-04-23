import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    createUser(input: $input) {
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  query UserLogin($input: UserLoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        name
        email
        avatar
        created_events {
          _id
          title
          description
          location
          date
          price
        }
      }
    }
  }
`;
