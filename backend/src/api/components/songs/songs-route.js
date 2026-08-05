const express = require('express');
const { getSongs, insertDB } = require('./songs-controller');
const { getSongs: song } = require('./songs-repository');

const route = express.Router();

module.exports = (app) => {
  app.use('/songs', route);

  route.get('/', async (req, res) => res.status(200).json(await song()));

  // put all songs
  route.post('/insertDB/', insertDB);
  route.post('/insertDB/:books/:lims', insertDB);

  // Get songs of specific
  route.get('/:book/:num', getSongs);
};
