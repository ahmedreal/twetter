const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14
    },
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://ahmed:azerty@cluster0.od2s3.mongodb.net/twitter?retryWrites=true&w=majority',
        ttl: 60 * 60 * 24 * 14,
    }),
}));