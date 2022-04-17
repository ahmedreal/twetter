const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('./database');
const app = express();
exports.app = app;
require('./config/session.config');
require('./config/passport.config');
const port = process.env.PORT || 3000;
const index = require('./routes');
const errorHandler = require('errorhandler');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);

if(process.env.NODE_ENV === 'DEV') {
    app.use(errorHandler());
} else {
    app.use((err, req, res, next ) => {
        const code = err.code || 500;
        return res.status(code).json({
                code: code,
                message: code === 500 ? null : err.message
            });
        })
}

app.listen(port);