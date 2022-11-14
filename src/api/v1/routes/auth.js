const express = require('express');
const { celebrate } = require('celebrate'); // tambahan
const isAuth = require('../middlewares/isAuth');
const userController = require('../controllers/user');
const authValidator = require('../validators/auth'); // tambahan

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.get(
    '/',
    isAuth,
    async (req, res) => res.json({
      status: 'OK', email: req.user.email,
    }).status(200),
  );

  route.post(
    '/register',
    celebrate(authValidator.register),
    async (req, res, next) => {
      try { // TODO : Check user is already registered?
        const existingUser = await userController.findByEmail(req.body.email);
        if (existingUser) {
          throw new Error('email is already registered');
        }
        // register user (insert to db)
        await userController.create(
          req.body.email,
          req.body.full_name,
          req.body.password,
        );

        return res.json({
          status: 'OK',
          email: req.body.email,
        }).status(200);
      } catch (err) {
        return next(err);
      }
    },
  );

  route.post(
    '/login',
    celebrate(authValidator.login),
    async (req, res, next) => {
      try {
        const user = await userController.login(req.body.email, req.body.password);
        if (!user) {
          throw new Error('Wrong email or pass');
        }

        // Generate token. As long as they have the /, it can be logged in (endpoint).
        // There are some that only be accesed after it has been logged in
        // To differentiate between logged in or not . JWT
        const token = await userController.generateToken(user.id);

        return res.json({
          email: user.email,
          full_name: user.full_name,
          token,
        }).status(200);
      } catch (err) {
        return next(err);
      }
    },
  );
};
