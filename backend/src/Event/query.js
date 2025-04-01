const { GraphQLObjectType, GraphQLList, GraphQLNonNull } = require("graphql");

const { EventType } = require("./types");
const { getEvents } = require("./resolvers");

const event_query = new GraphQLObjectType({
  name: "Query",
  fields: {
    events: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EventType))),
      resolve: async () => {
        return await getEvents();
      },
    },
  },
});

module.exports = event_query;
