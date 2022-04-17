const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ahmed:azerty@cluster0.od2s3.mongodb.net/twitter?retryWrites=true&w=majority')
        .then(() => console.log('Connexion db OK!'))
        .catch((err) => console.log(err));