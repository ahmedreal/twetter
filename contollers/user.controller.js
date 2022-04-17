const { createUser, findUserPerUsername, searchUsers, addUserIdToCurrentUserFollowing, findUserPerId, removeUserIdFromCurrentUserFollowing } = require('../queries/users.querie');
const { getUserTweetsFormAuthorId } = require('../queries/tweet.querie');
const path = require('path');
const multer = require('multer');

const upload = multer({ async fileFilter (req, file, cb) {
    const info = path.extname(file.originalname);
    if (!['.jpeg', '.png', '.avg'].includes(info)) {
    return cb(new Error('Seuls les .png, .jpeg, .avg sont autorisés'));
    } else {
    cb(null, true);   
    }
 },
                     limits: { fileSize: 1 * 1000 * 1000 },
                     storage: multer.diskStorage({
                        destination: (req, file, cb) => {
                            return cb(null, path.join(__dirname, '../public/images/avatars'));
                        },
                        filename: (req, file, cb) => {
                            return cb(null, `${Date.now()}-${file.originalname}`);
                        }
                     })
                });


exports.signupForm = (req, res, next) => {
    res.render('users/user-form', {error: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
}

exports.signup = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        res.redirect('/');
    } catch(e) {
        res.render('user/user-form', {errors: [e.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
}

// Le premier middleware va nous permettre de parser le fichier envoyé par le formulaire avec multer, de le sauvegarder sur le disque suivant la configuration définie, et de le mettre sur req.file.
// Le deuxième middleware, va enregistrer l'image sur l'utilisateur dans la propriété avatar.
exports.uploadImage = [
    upload.single('avatar'),
    async (req, res, next) => {
        try{
            const user = req.user;
            user.avatar = '/images/avatars/' + req.file.filename;
            await user.save();
            res.redirect('/');
        } catch(e) {
            next(e);
        }
    }
]

exports.userProfile = async (req, res, next) => {
    try{
        const username = req.params.username;
        const user = await findUserPerUsername(username);
        const tweets = await getUserTweetsFormAuthorId(user._id);
        res.render('tweets/tweet', {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user,  editable: false });
    } catch(e) {
        next(e);
    }
}

exports.searchUsers = async (req, res, next) => {
    try {
        const searchInput = req.params.searchInput;
        users = await searchUsers(searchInput);
        res.render('includes/search-menu', { users });
    } catch(e) {
        next(e);
    }
}

exports.followUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await addUserIdToCurrentUserFollowing(req.user, userId);
        const user = await findUserPerId(userId);
        res.redirect('/users/'+user.username);
    } catch(e) {
        next(e);
    }
}

exports.unfollowUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const currentUser = req.user;
        await removeUserIdFromCurrentUserFollowing(currentUser, userId);
        const user = await findUserPerId(userId);
        res.redirect('/users/'+user.username);
    } catch(e) {
        next(e);
    }
}