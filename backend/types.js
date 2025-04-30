const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
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

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    created_events: { type: new GraphQLList(new GraphQLNonNull(EventType)) }, // Uses EventType now
  }),
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

const UserLoginInputType = new GraphQLInputObjectType({
  name: "UserLoginInput",
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const UserLoginType = new GraphQLObjectType({
  name: "UserLogin",
  fields: () => ({
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) },
  }),
});

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    event: { type: new GraphQLNonNull(EventType) },
    user: { type: new GraphQLNonNull(UserType) },
    status: { type: new GraphQLNonNull(BookingStatusEnum) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const FindBookingInputType = new GraphQLInputObjectType({
  name: "FindBookingInput",
  fields: {
    event_id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

const BookingStatusEnum = new GraphQLEnumType({
  name: "BookingStatus",
  values: {
    PENDING: { value: "PENDING" },
    CONFIRMED: { value: "CONFIRMED" },
    CANCELLED: { value: "CANCELLED" },
  },
});

const BookingInputType = new GraphQLInputObjectType({
  name: "BookingInput",
  fields: {
    event_id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: BookingStatusEnum },
  },
});

const BookingUpdateInputType = new GraphQLInputObjectType({
  name: "BookingUpdateInput",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: BookingStatusEnum },
  },
});

module.exports = {
  UserType,
  UserInputType,
  UserLoginInputType,
  UserLoginType,
  EventType,
  EventInputType,
  BookingType,
  FindBookingInputType,
  BookingInputType,
  BookingUpdateInputType,
};
