const mongoose = require("mongoose");

const { hashPassword, verifyPassword } = require("../utils/passwordHash");

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    created_events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserModel.methods.verifyPassword = async function (_password) {
  return await verifyPassword(_password, this.password);
};

UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashed_password = await hashPassword(this.password);
  this.password = hashed_password;
});

const user = mongoose.model("User", UserModel);

module.exports = user;
