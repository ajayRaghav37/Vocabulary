var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

require('./models/user');

var user = mongoose.model('user');

module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, (err, doc) => {
            if (err)
                return done(err, false);

            if (doc === undefined)
                return done('User not found', false);

            return done(null, doc);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            user.findOne({
                username: username
            }, (err, doc) => {
                if (err)
                    return done(null, false);

                if (!doc)
                    return done('User does not exist', false);

                if (!isValidPassword(doc, password))
                    return done('Incorrect password', false);

                return done(null, doc);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            user.findOne({
                username: username
            }, (err, doc) => {
                if (err)
                    return done(err, false);

                if (doc)
                    return done('Username already taken', false);

                var newUser = new user();

                newUser.username = username;
                newUser.password = createHash(password);

                newUser.save((err, doc) => {
                    if (err)
                        return done(err, false);

                    return done(null, doc);
                });
            });
        }));

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};