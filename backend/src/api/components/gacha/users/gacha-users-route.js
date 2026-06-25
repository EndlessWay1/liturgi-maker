const express = require('express');

const gachaUsersController = require('./gacha-users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // get route has a params item & periode
  // Get all winners with the named blurred
  route.get('/gacha', gachaUsersController.getGachaWin);

  // Do Gacha
  route.post('/gacha', gachaUsersController.doGacha);
  // Get a list of all gacha history from a certain user
  route.get('/:id/gacha', gachaUsersController.getUserGachaHis);

  // this route only allows non loss items as params
  route.get('/:id/gacha/wins', gachaUsersController.getUserGachaWinHis);
};
