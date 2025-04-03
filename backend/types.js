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
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    created_by: { type: new GraphQLNonNull(UserType) }, // Uses UserType now
    attendees: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    created_events: { type: new GraphQLList(new GraphQLNonNull(EventType)) }, // Uses EventType now
    attending_events: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
  }),
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

const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = {
  UserType,
  UserInputType,
  EventType,
  EventInputType,
};
