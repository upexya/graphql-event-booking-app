const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { event_query, create_event_mutation } = require("./src/Event");
const { create_user_mutation, login_query } = require("./src/User");
const {
  create_booking_mutation,
  update_booking_status,
  bookings_query,
} = require("./src/Booking");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      events: event_query,
      bookings: bookings_query,
      login: login_query,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createEvent: create_event_mutation,
      createUser: create_user_mutation,
      createBooking: create_booking_mutation,
      updateBookingStatus: update_booking_status,
    },
  }),
});

module.exports = schema;
