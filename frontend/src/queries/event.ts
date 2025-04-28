import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      _id
      title
      description
      location
      date
      price
      created_by {
        _id
        name
        email
        avatar
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      location
      date
      price
      created_by {
        _id
        name
        email
        password
        avatar
      }
    }
  }
`;
