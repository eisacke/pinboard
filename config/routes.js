const router = require('express').Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const boardsController = require('../controllers/boards');
const secureRoute = require('../lib/secureRoute');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);

router.route('/boards')
  .get(secureRoute, boardsController.index)
  .post(secureRoute, boardsController.create);

router.route('/boards/:id')
  .get(secureRoute, boardsController.show)
  .put(secureRoute, boardsController.update)
  .delete(secureRoute, boardsController.delete);

module.exports = router;
