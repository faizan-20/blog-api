const express = require('express');
const router = express.Router();

const comment_controller = require('../controllers/commentController');
const post_controller = require('../controllers/postController');

router.get('/posts', post_controller.post_list);

router.get('/posts/:postId', post_controller.post_detail);

router.post('/posts', post_controller.post_create_post);

router.put('/posts/:postId', post_controller.post_update_post);

router.delete('/posts/:postId', post_controller.post_delete_post);

router.get('/posts/:postId/comments', comment_controller.comment_list);

router.get('/posts/:postId/comments/:commentId', comment_controller.comment_detail);

router.post('/posts/:postId/comments', comment_controller.comment_create_post);

router.put('/posts/:postId/comments/:commentId', comment_controller.comment_update_post);

router.delete('/posts/:postId/comments/:commentId', comment_controller.comment_delete_post);

module.exports = router;