const { createTweet, getTweets, deleteTweet, getTweet, updateTweet, getCurrentUserAndFollowingTweets } = require('../queries/tweet.querie');

exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getCurrentUserAndFollowingTweets(req.user);
        res.render('tweets/tweet', {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user, editable: true });
    } catch(e) {
        next(e);
    }
  };

  exports.tweetNew = (req, res, next) => {
    res.render('tweets/tweet-form', { tweet: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user });
  }

exports.tweetCreate =  async (req, res, next) => {
    try {
        await createTweet({ ...req.body, author: req.user._id });
        res.redirect('/');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message);
        res.status(400).render('tweets/tweet-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
};

exports.tweetDelete =  async (req, res, next) => {
    try {
        await deleteTweet(req.params.tweetId);
        const tweets = await getCurrentUserAndFollowingTweets(req.user);
        res.render('tweets/tweet-list', { tweets });
    } catch (e) {
       next(e);
    }
};

exports.tweetEdit = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await getTweet(tweetId);
        res.render('tweets/tweet-form', { tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user });
    } catch(e) {
        next(e);
    }
}

exports.tweetUpdate =  async (req, res, next) => {
    const tweetId = req.params.tweetId;
    try {
        await updateTweet(req.params.tweetId, req.body.content);
        res.redirect('/');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message);
        const tweet = await getTweet(tweetId);
        res.status(400).render('tweets/tweet-form', { errors, tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
};