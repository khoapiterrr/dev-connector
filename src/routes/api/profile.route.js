const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile.model');
const User = require('../../models/user.model');
const mongoose = require('mongoose');
const config = require('config');
const request = require('request');
// @router    GET api/profile
// @desc      GEt all profile
// @access    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('userId', [
      'name',
      'email',
      'avatar',
    ]);
    res.json(profiles);
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    Delete api/profile/delete
// @desc      Delete profile by id
// @access    Public
router.delete('/delete', async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.data.id });
    await User.findOneAndDelete({ _id: req.data.id });
    res.json({ msg: 'Xoá thành công' });
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    GET api/profile/user/:id
// @desc      GEt profile by id
// @access    Public
router.get('/user/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Profile not found.');
    }
    const profile = await Profile.findOne({
      userId: req.params.id,
    }).populate('userId', ['name', 'email', 'avatar']);
    if (!profile) {
      return res.status(400).send('Profile not found.');
    }
    res.json(profile);
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    GET api/profile/github/:username
// @desc      GEt user reps from github
// @access    Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId',
      )}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (err, response, body) => {
      if (err) console.error(err);
      else if (response.statusCode != 200) {
        res.status(400).json({ msg: 'No github profile found' });
      } else {
        res.json(JSON.parse(body));
      }
    });
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    GET api/profile/me
// @desc      Get current user profile
// @access    Public
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.data.id,
    }).populate('userId', ['name', 'email', 'avatar']);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    POST api/profile
// @desc      Create or update profile
// @access    Public
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Vui lòng cập nhật trạng thái').not().isEmpty(),
      check('skills', 'Vui lòng chọn skill').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubUserName,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    //build profile object
    const objProfile = {};
    console.log(req.data);
    objProfile.userId = req.data.id;
    if (company) objProfile.company = company;
    if (website) objProfile.website = website;
    if (location) objProfile.location = location;
    if (status) objProfile.status = status;
    if (bio) objProfile.bio = bio;
    if (githubUserName) objProfile.githubUserName = githubUserName;
    if (skills) {
      objProfile.skills = skills.split(',').map((e) => e.trim());
    }
    //social media profile
    objProfile.social = {};
    if (instagram) objProfile.social.instagram = instagram;
    if (youtube) objProfile.social.youtube = youtube;
    if (twitter) objProfile.social.twitter = twitter;
    if (facebook) objProfile.social.facebook = facebook;
    if (linkedin) objProfile.social.linkedin = linkedin;
    try {
      let profile = await Profile.findOne({ userId: req.data.id });
      // is update if profile exist
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { userId: req.data.id },
          { $set: objProfile },
          { new: true },
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(objProfile);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log('Err ' + error.message);
      return res.status(500).send('Server Error 500: ' + error.message);
    }
  },
);

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) =>
          !req.body.current && req.body.to ? value < req.body.to : true,
        ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

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
      const profile = await Profile.findOne({ userId: req.data.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ userId: req.data.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id,
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) =>
          !req.body.current && req.body.to ? value < req.body.to : true,
        ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ userId: req.data.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ userId: req.data.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id,
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
