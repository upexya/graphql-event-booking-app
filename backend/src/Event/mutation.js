const { GraphQLObjectType, GraphQLList, GraphQLNonNull } = require("graphql");

const { EventType, EventInputType } = require("./types");

const event_mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEvent: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EventType))),
      args: {
        input: { type: new GraphQLNonNull(EventInputType) },
      },
      resolve: (_, { input }) => {
        const { title, description, date, price } = input;
        return [
          {
            _id: Math.random().toString(),
            title,
            description,
            date,
            price,
          },
        ];
      },
    },
  },
});

module.exports = event_mutation;
