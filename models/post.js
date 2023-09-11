const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  published: { type: Boolean, required: true, default: false },
  timestamp: { type: Date, required: true },
});

PostSchema.virtual("url").get(function () {
  return `/api/post/${this._id}`;
});

PostSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model("Post", PostSchema);