const { GraphQLList, GraphQLNonNull } = require("graphql");

const { BookingType } = require("../../types");
const { getBookings } = require("./resolvers");

const bookings_query = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BookingType))),
  resolve: async (_, __, { req }) => {
    if (!req?.raw?.is_auth) {
      throw new Error("Unauthorized");
    }
    return await getBookings();
  },
};

module.exports = { bookings_query };
