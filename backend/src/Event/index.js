const event_types = require("./types");
const event_query = require("./query");
const create_event_mutation = require("./mutation");

module.exports = {
  ...event_types,
  event_query,
  create_event_mutation,
};
