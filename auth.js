const passport = require('passport');
const passportJWT = require('passport-jwt');
const users = require('./user.js');
const userSchema = require('./model/user/schema');
const cfg = require('./config.js');
const bcrypt = require('bcrypt');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const param = {
    secretOrKey: cfg.jtwSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    let strategy = new Strategy(param, function (payload, done) {
        console.log(payload);
        userSchema.findById(payload.id, (err, user) => {
            if (user) {
                return done(null, {id: user.id});
            } else {
                return done(new Error("User not found!", err), null);
            }

        });
    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", cfg.jtwSession);
        }
    }
}