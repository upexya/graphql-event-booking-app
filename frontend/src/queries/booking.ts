import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      _id
    }
  }
`;

export const GET_BOOKINGS = gql`
  query GetBookings($input: FindBookingInput) {
    bookings(input: $input) {
      _id
      status
      event {
        _id
        title
        description
        location
        date
        price
        created_by {
          _id
        }
      }
      user {
        _id
      }
    }
  }
`;

export const UPDATE_BOOKING_STATUS = gql`
  mutation UpdateBookingStatus($input: BookingUpdateInput!) {
    updateBookingStatus(input: $input) {
      _id
      status
      event {
        _id
      }
      user {
        _id
      }
    }
  }
`;
