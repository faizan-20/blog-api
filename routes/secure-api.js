const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

router.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

router.post('/posts', post_controller.post_create_post);

router.put('/posts/:postId', post_controller.post_update_post);

router.delete('/posts/:postId', post_controller.post_delete_post);

router.delete('/posts/:postId/comments/:commentId', comment_controller.comment_delete_post);

module.exports = router;