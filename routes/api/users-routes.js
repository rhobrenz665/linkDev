const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const usersController = require('../../controllers/users-controllers');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/register
// @desc    Sign up
// @access  Private
router.post('/register', usersController.register);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', usersController.login);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/', auth, usersController.getCurrent);

module.exports = router;
