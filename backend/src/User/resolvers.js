const User = require("./model");

const createUser = async ({ name, email, password, avatar }) => {
  try {
    const user_exists = await User.findOne({ email });
    if (user_exists) {
        throw new Error("User already exists");
    }

    const user = new User({
      name,
      email,
      password,
      avatar,
    });
    await user.save();

    return [{ ...user?._doc, _id: user?._doc?._id?.toString(), password: null }];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
};
