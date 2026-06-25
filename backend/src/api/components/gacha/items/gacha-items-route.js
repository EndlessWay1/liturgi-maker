const express = require('express');

const gachaItemsController = require('./gacha-items-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha-items', route);

  // Get list of all gacha available yang dapat dimenangi.
  // (query periode=)
  route.get('/', gachaItemsController.getValidItems);

  // get semua item gacha
  route.get('/all', gachaItemsController.getItems);

  // Get item spesifik
  route.get('/:id', gachaItemsController.getItem);

  // Create a new gacha
  route.post('/', gachaItemsController.createItems);

  // Delete an items
  route.delete('/:id', gachaItemsController.deleteItem);
};
