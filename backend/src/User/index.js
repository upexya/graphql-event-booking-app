const user_mutation = require("./mutation");
const user_query = require("./query");
const UserModel = require("./model");

module.exports = {
  ...user_mutation,
  ...user_query,
  UserModel,
};
