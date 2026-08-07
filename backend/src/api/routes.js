import express from 'express';

import songsRoute from './components/parser/songs/songs-route.js';

import ayatController from './components/parser/ayat/ayat-controller.js';

import {
  docsJadwal,
  docsLiturgi,
} from './components/parser/docs/docs-controller.js';

export default () => {
  const app = express.Router();

  app.get('/csrf-token', async (req, res) => {
    res.json({ csrfToken: req.cookies.csrf_token_client });
  });

  app.get('/liturgi', docsLiturgi);
  app.get('/jadwal', docsJadwal);

  app.get('/ayat/:book', ayatController);

  songsRoute(app);

  return app;
};
