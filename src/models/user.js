const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email: String,
  full_name: String,
  password: String,
});

module.exports = mongoose.model('Users', schema);
