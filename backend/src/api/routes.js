const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gachaItems = require('./components/gacha/items/gacha-items-route');
const gachaUsers = require('./components/gacha/users/gacha-users-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  gachaUsers(app);
  users(app);
  gachaItems(app);

  return app;
};
