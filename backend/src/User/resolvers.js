const User = require("./model");

const generateToken = require("../utils/generateJwtToken");

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

    return [
      { ...user?._doc, _id: user?._doc?._id?.toString(), password: null },
    ];
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email }).populate(
      "created_events"
    );
    if (!user) {
      throw new Error("User does not exist.");
    }

    const is_password_valid = await user.verifyPassword(password);
    if (!is_password_valid) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user.id);

    return {
      token,
      user: {
        ...user._doc,
        password: null,
        _id: user.id,
      },
    };
  } catch (error) {
    throw new Error(error?.message || "Error while logging in!");
  }
};

module.exports = {
  createUser,
  loginUser,
};
