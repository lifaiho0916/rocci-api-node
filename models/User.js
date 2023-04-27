const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  token_iat: {
    type: String,
  },
  last_login: {
    type: Date,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  privacy: {
    type: Boolean,
    required: true,
  },
  privacyNewsLetter: {
    type: Boolean,
    required: true,
  },
  devices: [
    {
      mac: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserSchema);
