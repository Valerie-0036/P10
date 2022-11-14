process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();
// tanya lagi node env apa, kalo null nnti development
const dotenv = require('dotenv');
// cari dotenv ketemu atau engga pathnya
const envFound = dotenv.config({ path: './config/.env' });
if (envFound.error) {
  throw new Error('File .env not found');
}

module.exports = {
  port: process.env.PORT || 5000,
  // connect dari config js ke .env, 5000 adalah default value jika process.env not found
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
};
