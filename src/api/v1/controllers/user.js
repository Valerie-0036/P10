const jwt = require('jsonwebtoken');
const { Users } = require('../../../models');
const config = require('../../../core/config');
const { hashPassword, comparePassword } = require('../../../helpers/crypto');

async function create(email, fullName, password) {
  const hashedPassword = await hashPassword(password);
  const newUser = new Users({
    email,
    full_name: fullName,
    password: hashedPassword,
  });

  return newUser.save();
}

async function findByEmail(email) {
  return Users.findOne({ email }).exec();
}

async function login(email, password) {
  const user = await findByEmail(email);
  if (!user) {
    return null;
  }

  const passwordMatched = await comparePassword(password, user.password);

  return passwordMatched ? user : null;
}

async function generateToken(id) {
  const payload = { id };
  return jwt.sign(payload, config.jwtSecretKey);
}

async function findById(id) {
  return Users.findById(id);
}

module.exports = {
  create,
  findByEmail,
  login,
  generateToken,
  findById,
};
