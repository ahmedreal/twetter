const { signupForm, signup, uploadImage, userProfile, searchUsers, followUser, unfollowUser } = require('../contollers/user.controller');
const { ensureAuthenticated } = require('../config/guards.config');
const router = require('express').Router();

router.get('/:username', ensureAuthenticated, userProfile);
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unfollowUser);
router.get('/search/:searchInput', searchUsers);
router.get('/signup/form', signupForm);
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage)

module.exports = router;