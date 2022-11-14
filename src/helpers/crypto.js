const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 8;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
module.exports = {
  hashPassword,
  comparePassword,
};
