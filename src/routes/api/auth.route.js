const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');
const JWToken = require('../../utils/JsonWebToken');
const sendMail = require('../../utils/MailHelper');
// @router    GET api/auth
// @desc      Test router
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.data.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router    POST api/auth/login
// @desc      Đăng nhập
// @access    Public
router.post(
  '/login',
  [
    check('email', 'Vui lòng nhập email').not().isEmpty(),
    check('email', 'Email không đúng đinh dạng').isEmail(),
    check('password', 'Vui lòng nhập password').not().isEmpty(),
  ],
  async (req, res) => {
    const erorrs = validationResult(req);
    if (!erorrs.isEmpty()) {
      return res.status(422).json({ errors: erorrs.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: 'Người dùng không tồn tại' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: 'Mật khẩu không chính xác' });
      }
      user.token = await JWToken.generateToken({ email, id: user.id });
      sendMail({
        email: 'khoapiterrr99@gmail.com',
        subject: 'Mail xác nhận',
        name: 'Lê trọng khoa',
        textPart: 'Cháu chào chú',
      });
      await user.save();

      return res.status(200).send(user.transform());
    } catch (error) {
      console.log('Err ' + error.message);
      return res.status(500).send('Server Error 500: ' + error.message);
    }
  },
);

module.exports = router;
