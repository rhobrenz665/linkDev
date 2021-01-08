const express = require('express');
const router = express.Router();

const postsController = require('../../controllers/posts-controllers');

const checkAuth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   POST api/posts
// @desc    Get posts
// @access  Public
router.get('/', postsController.getPosts);

// @route   POST api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', checkObjectId('id'), postsController.getPostsById);

// @authentication
// @desc  Add Authentication
// @access  Private
router.use(checkAuth);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', postsController.createPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', checkObjectId('id'), postsController.deletePost);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', checkObjectId('id'), postsController.addLike);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', checkObjectId('id'), postsController.unLike);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.put('/comment/:id', checkObjectId('id'), postsController.addComment);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', postsController.deleteComment);

module.exports = router;
