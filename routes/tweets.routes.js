const { tweetNew, tweetList, tweetCreate, tweetDelete, tweetEdit, tweetUpdate } = require('../contollers/tweet.controller');
const router = require('express').Router();

router.get('/',  tweetList);
router.get('/new', tweetNew);
router.post('/', tweetCreate);
router.post('/update/:tweetId', tweetUpdate);
router.delete('/:tweetId', tweetDelete);
router.get('/edit/:tweetId', tweetEdit); 

module.exports = router;