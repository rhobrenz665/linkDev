// Load Input Validation
const validatePostInput = require('../validation/post');

// const HttpError = require('../models/http-error');

// // Load Profile Model
// const Profile = require('../models/Profile');
// Load User Model
const User = require('../models/User');
//  Load Post Model
const Post = require('../models/Post');

const createPost = async (req, res, next) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findById(req.userData.userId).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.userData.userId,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getPostsById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.userData.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

const addLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    // (some) check if at least one element in the array passes the test
    if (post.likes.some(like => like.user.toString() === req.userData.userId)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    //Add user id to like array
    post.likes.unshift({ user: req.userData.userId });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const unLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (
      !post.likes.some(like => like.user.toString() === req.userData.userId)
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.userData.userId
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const addComment = async (req, res, next) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findById(req.userData.userId).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.userData.userId,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.userData.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPostsById = getPostsById;
exports.deletePost = deletePost;
exports.addLike = addLike;
exports.unLike = unLike;
exports.addComment = addComment;
exports.deleteComment = deleteComment;
