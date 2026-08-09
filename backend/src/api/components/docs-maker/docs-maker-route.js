import express from 'express';
import { filterAyat } from '../parser/ayat/ayat-controller.js';
import { filterSongs } from '../parser/songs/songs-controller.js';
import { filterHead, makeDocs } from './docs-maker-controller.js';

const route = express.Router();

export default (app) => {
  app.use('/docs', route);

  route.post('/liturgi', filterHead, filterAyat, filterSongs, makeDocs);
};
