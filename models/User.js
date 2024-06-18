const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required!"],
  },
  fullname: {
    type: String,
  },
  Stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  follwings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
