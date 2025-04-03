const { GraphQLList, GraphQLNonNull } = require("graphql");

const {
  BookingType,
  BookingInputType,
  BookingUpdateInputType,
} = require("../../types");
const { bookEvent, updateBookingStatus } = require("./resolvers");

const create_booking_mutation = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BookingType))),
  args: {
    input: { type: new GraphQLNonNull(BookingInputType) },
  },
  resolve: async (_, { input }) => {
    try {
      const { event_id, user_id, status } = input;
      return bookEvent({ event_id, user_id, status });
    } catch (error) {
      throw new Error(error?.message || "Error creating event");
    }
  },
};

const update_booking_status = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BookingType))),
  args: {
    input: { type: new GraphQLNonNull(BookingUpdateInputType) },
  },
  resolve: async (_, { input }) => {
    try {
      const { _id, status } = input;
      return updateBookingStatus({ _id, status });
    } catch (error) {
      throw new Error(error?.message || "Error cancelling booking");
    }
  },
};

module.exports = { create_booking_mutation, update_booking_status };
