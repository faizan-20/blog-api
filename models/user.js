const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

UserSchema.virtual("url").get(function () {
  return `/api/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
