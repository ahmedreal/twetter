const { app } = require('../app');
const passeport = require('passport');
const { findUserPerId, findUserPerEmail } = require('../queries/users.querie');
const Localstrategy = require('passport-local').Strategy;

app.use(passeport.initialize()); // initialisation obligatoire
app.use(passeport.session()); // utilisation des sessions avec passport

// Après l'authentification nous ne stockons que l'_id du user
// dans la session pour ne pas la surcharger
passeport.serializeUser((user, done) => {
    return done(null, user._id);
});

// A chaque requête, la session est récupérée par express-session en utilisant
// l'id de la session dans le cookie. Passport récupère l'_id du user dans la session
// et exécute cette méthode. Nous récupérons le user avec son _id et le retournons
// à Passport avec done(null, user). Passport le mettra alors sur req.user
passeport.deserializeUser(async (id, done) => {
    try{
        const user = await findUserPerId(id);
        done(null, user);
    } catch(e) {
        done(e);
    }
});

// Configuration de la stratégie locale
// Nous utilisons l'email comme identifiant et devons donc passer
// l'option usernameField
passeport.use('local', new Localstrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        // Nous essayons de récupérer l'utilisateur avec son email
        const user = await findUserPerEmail(email);
        if (user) {
            // Si nous le retrouvons nous comparons le mot de passe hashé de la bdd
             // avec le hash du mot de passe fourni par l'utilisateur
            const match = await user.comparePassword(password);
            if(match) {
                // Si ça match alors le mot de passe est correct
                return done(null, user);
            } else {
                // Si les hash ne matchent pas, le mot de passe rentré n'est
                // pas le bon et nous retournons une erreur
                return done(null, false, { message : 'Wrong password'});
            }
        } else {
            // Si nous n'avons pas de user, nous retournons une erreur
            return done(null, false, { message : 'User not found'});
        }
    } catch(e) {
       return done(e);
    }
}));