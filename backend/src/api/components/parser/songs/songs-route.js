import express from 'express';
import { getSongs, insertDB } from './songs-controller.js';
// import {getSongs as song} from './songs-repository.js';

const route = express.Router();

export default (app) => {
  app.use('/songs', route);

  // route.get('/', async (req, res) => res.status(200).json(await song()));

  // put all songs
  route.post('/insertDB/', insertDB);
  route.post('/insertDB/:books/:lims', insertDB);

  // Get songs of specific
  route.get('/:book/:num', getSongs);
};
