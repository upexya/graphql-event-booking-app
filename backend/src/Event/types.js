const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    created_by: { type: new GraphQLNonNull(GraphQLID) },
    attendees: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
  },
});

const EventInputType = new GraphQLInputObjectType({
  name: "EventInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    created_by: { type: new GraphQLNonNull(GraphQLID) },
  },
});

module.exports = {
  EventType,
  EventInputType,
};
