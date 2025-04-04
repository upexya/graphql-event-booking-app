const { GraphQLNonNull } = require("graphql");

const { UserLoginInputType, UserLoginType } = require("../../types");
const { loginUser } = require("./resolvers");

const login_query = {
  type: new GraphQLNonNull(UserLoginType),
  args: {
    input: { type: GraphQLNonNull(UserLoginInputType) },
  },
  resolve: async (_, { input }) => {
    const { email, password } = input;
    return await loginUser({ email, password });
  },
};

module.exports = {
  login_query,
};
