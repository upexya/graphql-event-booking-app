const { GraphQLList, GraphQLNonNull } = require("graphql");

const { EventType, EventInputType } = require("./types");
const { createEvent } = require("./resolvers");

const create_event_mutation = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EventType))),
  args: {
    input: { type: new GraphQLNonNull(EventInputType) },
  },
  resolve: async (_, { input }) => {
    try {
      const { title, description, date, price, location, created_by } = input;
      return await createEvent({
        title,
        description,
        date,
        price,
        location,
        created_by,
      });
    } catch (error) {
      throw new Error(error?.message || "Error creating event");
    }
  },
};

module.exports = create_event_mutation;
