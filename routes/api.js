const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => {
    res.json({
        message: 'GET Blog posts',
    });
});

router.get('/post/:postId', (req, res) => {
    res.send(`GET blog post ${req.params.postId}`);
});

router.post('/post', (req, res) => {
    res.json({
        message: 'POST blog post',
    });
});

router.put('/post/:postId', (req, res) => {
    res.send(`PUT blog post ${req.params.postId}`);
});

router.delete('/post/:postId', (req, res) => {
    res.send(`DELETE blog post ${req.params.postId}`);
})

router.get('/post/:postId/comments', (req, res) => {
    res.send(`GET comments for post ${req.params.postId}`);
});

router.post('/post/:postId/comment', (req, res) => {
    res.send(`POST comment for post ${req.params.postId}`);
});

router.put('/post/:postId/comments/:commentId', (req,res) => {
    res.send(`PUT comment ${req.params.commentId}`);
});

router.delete('/post/:postId/comments/:commentId', (req, res) => {
    res.send(`DELETE comment ${req.params.commentId}`);
});

module.exports = router;