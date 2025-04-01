const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { event_query, create_event_mutation } = require("./src/Event");
const {create_user_mutation} = require("./src/User");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      events: event_query,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createEvent: create_event_mutation,
      createUser: create_user_mutation,
    },
  }),
});

module.exports = schema;
