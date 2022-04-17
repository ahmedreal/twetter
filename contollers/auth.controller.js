const passeport = require('passport');

exports.signinForm = (req, res, next) => {
    res.render('auth/auth-form', { errors: null});
}

exports.signin = (req, res, next) => {
    passeport.authenticate('local', (err, user, info) => {
        if(err) {
            next(err);
        } else if(!user){
            res.render('auth/auth-form', { errors: [ info.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
        } else {
            req.login(user, (err) => {
                if (err) { 
                    next(err) 
                } else {
                  res.redirect('/tweets');
                }
              })
        }
    })(req, res, next);
}

exports.signout = (req, res, next) => {
    req.logout();
    res.redirect('/auth/signin/form');
}