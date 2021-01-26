const axios = require('axios');

// Load Input Validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

const HttpError = require('../models/http-error');

// Load Profile Model
const Profile = require('../models/Profile');
// Load User Model
const User = require('../models/User');

const getUserCurrentProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      const error = new HttpError('There is no profile for this user', 404);
      return next(error);
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createUserProfile = async (req, res, next) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin,
  } = req.body;

  // Get Fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (handle) profileFields.handle = handle;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  // Skills - Spilt into array
  if (typeof skills !== 'undefined') {
    profileFields.skills = skills.split(',');
  }

  // Social
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError('Server Error', 500);
    return next(error);
  }
};

const getHandler = async (req, res, next) => {
  try {
    const profile = await Profile.find({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar']);

    if (profile.length === 0)
      return next(new HttpError('Profile not found', 404));

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return new HttpError('Server error', 500);
  }
};

const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return next(new HttpError('Profile not found', 400));

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return next(new HttpError('Profile not found', 404));
    }
    return new HttpError('Server error', 500);
  }
};

const getAllProfile = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    if (!profiles) return next(new HttpError('There are no profiles', 404));

    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return new HttpError('There are no profiles', 404);
  }
};

const addExperience = async (req, res, next) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Add exp array
    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const addEducation = async (req, res, next) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteExp = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      exp => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const deleteEduc = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.education = foundProfile.education.filter(
      educ => educ._id.toString() !== req.params.educ_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const deleteUserAndProfile = async (req, res, next) => {
  try {
    // Remove user posts
    // await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getGithubRepos = async (req, res, next) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.githubToken}`,
    };
    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
};

exports.getUserCurrentProfile = getUserCurrentProfile;
exports.createUserProfile = createUserProfile;
exports.getHandler = getHandler;
exports.getProfileByUserId = getProfileByUserId;
exports.getAllProfile = getAllProfile;
exports.addExperience = addExperience;
exports.addEducation = addEducation;
exports.deleteExp = deleteExp;
exports.deleteEduc = deleteEduc;
exports.deleteUserAndProfile = deleteUserAndProfile;
exports.getGithubRepos = getGithubRepos;
