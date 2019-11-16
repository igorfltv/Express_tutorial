const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please use valid email"
    ]
  },

  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user"
  },

  password: {
    type: String,
    required: [true, "Please input a password"],
    minlength: 6,
    select: false
  },

  resetPasswordToken: String,
  resetPasswordExpiration: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);