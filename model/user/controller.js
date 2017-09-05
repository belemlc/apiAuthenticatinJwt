const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const users = require('../../user.js');
const jwt = require('jsonwebtoken');
const cfg = require('../../config.js');

class UserController extends Controller {
    member(req, res, next) {
        let authorization = req.get('Authorization');
        if (authorization) {
            let token = authorization.split(' ')[1] || null;
            console.log(jwt.verify(token, cfg.jtwSecret));
            res.json(token);
        }
    }
}

module.exports = new UserController(userFacade);
