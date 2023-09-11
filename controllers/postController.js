const Post = require('../models/post');
const Comment = require('../models/comment');

const asyncHandler = require('express-async-handler');

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({})
        .sort({ timestamp: 1 })
        .exec();

    res.json({
        allPosts,
    });
});

exports.post_detail = asyncHandler(async (req, res, next) => {
    const [post, comments] = await Promise.all([
        Post.findById(req.params.postId).exec(),
        Comment.find({ post: req.params.postId }).exec(),
    ]);
    res.json({
        post,
        comments,
    });
})

exports.post_create_post = asyncHandler(async (req, res, next) => {
    const post = new Post({
        author: req.body.author,
        title: req.body.title,
        text: req.body.text,
        published: req.body.published,
        timestamp: new Date(),
    });

    await post.save();
    res.json({
        post
    });
});

exports.post_update_post = asyncHandler(async (req, res, next) => {
    const post = new Post({
        author: req.body.author,
        title: req.body.ttile,
        text: req.body.text,
        published: req.body.publsihed,
        timestamp: new Date(),
        _id: req.params.postId,
    });

    await Post.findByIdAndUpdate(req.params.postId, post, {});
    res.json ({
        post
    })
});

exports.post_delete_post = asyncHandler(async (req, res, next) => {
    await Comment.deleteMany({ post: req.params.postId });
    await Post.findByIdAndDelete(req.params.postId);

    const posts = await Post.find({}).sort({ timestamp: 1 }).exec();
    res.json({
        posts 
    })
})