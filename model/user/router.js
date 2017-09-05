const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const auth = require('./../../auth')();

//router.get("/member", auth.authenticate(), controller.member);

router.route('/')
  .get(auth.authenticate(), (...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/member')
  .get(auth.authenticate(), (...args) => controller.member(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
