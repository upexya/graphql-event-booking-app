const booking_mutation = require("./mutation");
const bookings_query = require("./query");

module.exports = {
  ...booking_mutation,
  ...bookings_query,
};
