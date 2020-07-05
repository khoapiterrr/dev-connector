const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/user.model');
const JWToken = require('../../utils/JsonWebToken');
const router = express.Router();

// @router    GET api/user
// @desc      Test router
// @access    Public
router.get('/', (req, res) => {
  res.send('User router');
});

// @router    Post api/user/register
// @desc      Đăng kí tài khoản đăng nhập
// @access    Public
router.post(
  '/register',
  [
    check('name', 'Vui lòng nhập họ tên đầy đủ').not().isEmpty(),
    check('email', 'Vui lòng nhập email').not().isEmpty(),
    check('email', 'Email không đúng đinh dạng').isEmail(),
    check('password', 'Vui lòng nhập password').not().isEmpty(),
    check('password', 'Password phải nhập trên 6 kí tự').isLength({ min: 6 }),
    // check('email').custom((value) => {
    //   return User.findOne({ email: value }, (err, res) => {
    //     if (!err) {
    //       return Promise.reject('email confirmation is incorrect');
    //     }
    //   });
    // }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, avatar, date } = req.body;
      let user = await await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: 'Email đã tồn tại trong hệ thống' });
      }
      user = new User({ email, name, password, date, avatar });
      // generate avatar if avatar is null
      if (!avatar) {
        user.avatar =
          'http:' +
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          });
      }
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);
      const token = await JWToken.generateToken({ email, id: user.id });
      user.token = token;
      await user.save();
      return res.status(200).send(user.transform());
    } catch (error) {
      console.log('Err ' + error.message);
      return res.status(500).send('Server Error 500: ' + error.message);
    }
  },
);
// @router    Put api/user/update
// @desc      cập  nhật
// @access    Public
router.put(
  '/update',
  [
    auth,
    [
      check('name', 'Vui lòng nhập họ tên đầy đủ').not().isEmpty(),
      check('email', 'Vui lòng nhập email').not().isEmpty(),
      check('email', 'Email không đúng đinh dạng').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { name, email, avatar } = req.body;
      let user = await User.findById(req.data.id);
      if (!user) {
        return res.status(400).json({ msg: 'Không tìm thấy user' });
      }
      const dataUpdate = {
        name,
        email,
        avatar,
      };
      const updateUser = await User.findOneAndUpdate(
        { _id: req.data.id },
        { $set: dataUpdate },
        { new: true },
      );
      return res.json(updateUser);
    } catch (error) {
      console.log('Err ' + error.message);
      return res.status(500).send('Server Error 500: ' + error.message);
    }
  },
);
module.exports = router;
