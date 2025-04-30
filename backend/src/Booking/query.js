const { GraphQLList, GraphQLNonNull } = require("graphql");

const { BookingType, FindBookingInputType } = require("../../types");
const { getBookings } = require("./resolvers");

const bookings_query = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BookingType))),
  args: {
    input: { type: FindBookingInputType },
  },
  resolve: async (_, { input }, { req }) => {
    if (!req?.raw?.is_auth) {
      throw new Error("Unauthorized");
    }
    const { event_id, user_id } = input || {};
    return await getBookings({ event_id, user_id });
  },
};

module.exports = { bookings_query };
