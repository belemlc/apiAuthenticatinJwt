const Controller = require('../../lib/controller');
const petFacade = require('./facade');
const users = require('../../user.js');
const userSchema = require('../user/schema');
const cfg = require('../../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const assert = require('assert');

class PetController extends Controller {
    token(req, res, next) {
        if (req.body.email && req.body.password) {
            
            let email = req.body.email;
            let password = req.body.password;
            let query = {email: email};
            
            userSchema.findOne(query, (err, user) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        error: err
                    });
                }
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            let payload = {id: user.id};
                            let token = jwt.sign(payload, cfg.jtwSecret, {expiresIn: '60s'});
                            res.status(200).json({
                                success: true,
                                token: `BEARER ${token}`
                            });
                        } else {
                            return err;
                        }
                    });
                } else {
                    console.log('findOne error');
                    res.status(401).json({
                        success: false,
                        error: err
                    });
                }
            });
        }
    }
    create(req, res, next) {
        
    }
}

module.exports = new PetController(petFacade);
