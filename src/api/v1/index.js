const express = require('express');
const auth = require('./routes/auth'); // tambahan

module.exports = () => {
  const app = express.Router();

  auth(app); // tambahan

  return app;
};
