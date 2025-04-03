const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");

const { BookingType, BookingInputType } = require("../../types");
const { bookEvent } = require("./resolvers");

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

module.exports = { create_booking_mutation };
