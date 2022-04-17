const Tweet = require('../database/models/tweet.model');

exports.getTweets = (currentUser) => {
    return Tweet.find().exec();
}

exports.getCurrentUserAndFollowingTweets = (user) => {
    return Tweet.find({ author : { $in: [  user._id, ...user.following ]} }).populate('author').exec();
}

exports.getUserTweetsFormAuthorId = (id) => {
    return Tweet.find({author: id}).populate('author').exec();
}

exports.createTweet = (tweet) => {
    const newTweet = new Tweet(tweet);
    return newTweet.save();
}

exports.deleteTweet = (tweetID) => {
    return Tweet.findByIdAndDelete(tweetID).exec();
}

exports.getTweet = (tweetId) => {
    return Tweet.findById(tweetId).exec();
}

exports.updateTweet = (tweetId, content) => {
    return Tweet.findByIdAndUpdate(tweetId, {$set: { content }}, { runValidators: true }).exec();
}