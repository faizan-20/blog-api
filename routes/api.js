const express = require('express');
const router = express.Router();
require('dotenv').config();

const comment_controller = require('../controllers/commentController');
const post_controller = require('../controllers/postController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/posts', post_controller.post_list);

router.get('/posts/:postId', post_controller.post_detail);

router.get('/posts/:postId/comments', comment_controller.comment_list);

router.get('/posts/:postId/comments/:commentId', comment_controller.comment_detail);

router.post('/posts/:postId/comments', comment_controller.comment_create_post);

router.put('/posts/:postId/comments/:commentId', comment_controller.comment_update_post);

router.post(
    '/signup', 
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, process.env.SECRET_KEY);

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "logout succesfull" });
  });
})

module.exports = router;