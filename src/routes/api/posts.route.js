const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const mongoose = require('mongoose');
const config = require('config');
const request = require('request');

// @router    POST api/posts
// @desc      Create Post
// @access    Public
router.post(
  '/',
  [auth, [check('text', 'Vui lòng nhập text').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const user = User.findById(req.data.id).select('-password');
      const newPost = new Post({
        userId: req.data.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.log('Err ' + error.message);
      return res.status(500).send('Server Error 500: ' + error.message);
    }
  },
);

// @router    GET api/posts
// @desc      get all post
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    GET api/posts/:id
// @desc      get post by id
// @access    Public
router.get('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Post not found' });
    }
    const post = await Post.find(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

// @router    DELETE api/posts/:id
// @desc      delete post by id
// @access    Public
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    const post = await Post.find(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }
    //check user delete
    if (req.data.id !== post.userId.toString()) {
      return res.status(401).json({ msg: 'Không có quyền xoá' });
    }
    await post.remove();
    res.json('Xoá thành công');
  } catch (error) {
    console.log('Err ' + error.message);
    return res.status(500).send('Server Error 500: ' + error.message);
  }
});

module.exports = router;
