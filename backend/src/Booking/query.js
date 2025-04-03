const { GraphQLList, GraphQLNonNull } = require("graphql");

const { BookingType } = require("../../types");
const { getBookings } = require("./resolvers");

const bookings_query = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BookingType))),
  resolve: async () => {
    return await getBookings();
  },
};

module.exports = { bookings_query };
