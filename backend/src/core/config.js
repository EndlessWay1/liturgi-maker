const dotenv = require('dotenv');

if (process.env.VERCEL !== '1') {
  dotenv.config();
}

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = {
  env: process.env.NODE_ENV,
  api: {
    prefix: '/api',
  },
  port: process.env.PORT || 5000,
  database: {
    connection: process.env.DB_CONNECTION,
    name: process.env.DB_NAME,
  },
};