const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/api/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
