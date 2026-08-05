import dotenv from 'dotenv';

if (process.env.VERCEL !== '1') {
  dotenv.config();
}

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

export const env = process.env.NODE_ENV;
export const api = {
  prefix: '/api',
};

export const database = {
  connection: process.env.DB_CONNECTION,
  name: process.env.DB_NAME,
};

export const port = process.env.PORT || 5000;

export default {
  env,
  api,
  port,
  database,
};
