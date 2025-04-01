const {
  GraphQLSchema,
} = require("graphql");

const { event_query, event_mutation } = require("./src/Event");

const schema = new GraphQLSchema({
  query: event_query,
  mutation: event_mutation,
});

module.exports = schema;
