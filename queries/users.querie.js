const User = require('../database/models/user.model');

exports.createUser = async (body) => {
    try{
        const passwordHashed = await User.hashPassword(body.password);
        const user = new User({
            username: body.username,
            local: {
              email: body.email,
              password: passwordHashed
            }
        });
        return user.save();
    } catch(e) {
        throw(e);
    }
}

exports.findUserPerId = (id) => {
    return User.findById(id).exec();
}

exports.findUserPerEmail = (email) => {
    return User.findOne({'local.email': email}).exec();
}

exports.findUserPerUsername = (username) => {
    return User.findOne({username}).exec();
}

exports.searchUsers = (searchInput) => {
    const regExp = new RegExp(`^${searchInput}`);
    return User.find({username: {$regex: regExp}}).exec();
}

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
    currentUser.following = [...currentUser.following, userId];
    return currentUser.save();
    // return User.updateOne({_id: currentUser._id}, { $push: { following: userId } });
}

exports.removeUserIdFromCurrentUserFollowing = (currentUser, userId) => {
    currentUser.following = currentUser.following.filter(f => f._id .toString() !== userId);
    return currentUser.save();
    // return User.updateOne({_id: currentUser._id}, { $pull: { following: userId } });
}