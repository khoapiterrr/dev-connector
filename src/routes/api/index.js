const express = require('express');
const userRoutes = require('./users.route');
const authRoutes = require('./auth.route');
const postsRoutes = require('./posts.route');
const profileRoutes = require('./profile.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

// /**
//  GET v1/docs
//  /*/
// router.use('/docs', express.static('docs'));

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
