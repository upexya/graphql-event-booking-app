const { GraphQLList, GraphQLNonNull } = require("graphql");

const { UserType, UserInputType } = require("../../types");
const { createUser } = require("./resolvers");

const create_user_mutation = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
  args: {
    input: { type: new GraphQLNonNull(UserInputType) },
  },
  resolve: async (_, { input }) => {
    const { name, email, password, avatar } = input;
    try {
      return await createUser({ name, email, password, avatar });
    } catch (error) {
      throw new Error(error?.message || "Error creating user");
    }
  },
};

module.exports = { create_user_mutation };
