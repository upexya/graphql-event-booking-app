const { GraphQLList, GraphQLNonNull } = require("graphql");

const { EventType, EventInputType } = require("./types");
const { createEvent } = require("./resolvers");

const create_event_mutation = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EventType))),
  args: {
    input: { type: new GraphQLNonNull(EventInputType) },
  },
  resolve: async (_, { input }) => {
    const { title, description, date, price } = input;
    return await createEvent({ title, description, date, price });
  },
};

module.exports = create_event_mutation;
