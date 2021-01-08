const express = require('express');
const router = express.Router();

const profileController = require('../../controllers/profile-controllers');
const checkAuth = require('../../middleware/auth');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handle
// @access   Public
router.get('/handle/:handle', profileController.getHandler);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', profileController.getProfileByUserId);

// @route   GET api/profile/all
// @desc    Get all profile
// @access  Public
router.get('/all', profileController.getAllProfile);

// @authentication
// @desc  Add Authentication
// @access  Private
router.use(checkAuth);

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', profileController.getUserCurrentProfile);

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', profileController.createUserProfile);

// @route   PUT api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.put('/experience', profileController.addExperience);

// @route   PUT api/profile/education
// @desc    Add education to profile
// @access  Private
router.put('/education', profileController.addEducation);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', profileController.deleteExp);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:educ_id', profileController.deleteEduc);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete('/', profileController.deleteUserAndProfile);

module.exports = router;
