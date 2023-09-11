const Comment = require('../models/comment');
const Post = require('../models/post');

const asyncHandler = require('express-async-handler');

exports.comment_list = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ post: req.params.postId }).exec();

    res.json({
        comments
    });
});

exports.comment_detail = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId).exec();

    res.json({
        comment
    });
});

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        timestamp: new Date(),
        post: req.params.postId,
    });

    await comment.save();
    res.json ({
        comment
    });
});

exports.comment_update_post = asyncHandler(async (req, res, next) => {
    const prevComment = await Comment.findById(req.params.CommentId).exec();

    const comment = new Comment ({
        name: prevComment.name,
        comment: req.body.comment,
        timestamp: prevComment.timestamp,
        post: req.params.postId,
        _id: req.params.CommentId,
    });

    await Comment.findByIdAndUpdate(req.params.CommentId, comment, {});
    res.json ({
        comment
    });
});

exports.comment_delete_post = asyncHandler(async (req, res, next) => {
    await Comment.findByIdAndDelete(req.params.commentId);

    const comments = await Comment.find({ post: req.params.PostId }).sort({ timestamp: 1 }).exec();
    res.json ({
        comments
    });
});