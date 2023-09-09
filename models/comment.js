const { DateTime } = require('luxon');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: { type: String, default: "Anonymus" },
    comment: { type: String, requried: true },
    timestamp: { type: Date, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
});

CommentSchema.virtual("url").get(function () {
    return `/api/comment/${this._id}`;
});

CommentSchema.virtual("timestamp_formatted").get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model("Comment", CommentSchema);