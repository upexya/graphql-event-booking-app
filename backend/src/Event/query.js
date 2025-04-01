const { GraphQLObjectType, GraphQLList, GraphQLNonNull } = require("graphql");

const { EventType } = require("./types");

const event_query = new GraphQLObjectType({
  name: "Query",
  fields: {
    events: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EventType))),
      resolve: () => {
        return [
          {
            _id: "1",
            title: "title1",
            description: "description1",
            date: "date1",
            price: 1.4,
          },
        ];
      },
    },
  },
});

module.exports = event_query;
