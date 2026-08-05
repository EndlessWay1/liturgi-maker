import express from  'express';

import songsRoute from './components/songs/songs-route.js';

export default () => {
  const app = express.Router();

  app.get('/csrf-token', async (req, res) => {
    res.json({ csrfToken: req.cookies.csrf_token_client });
  });

  app.post('/', (req, res) => {
    res
      .status(403)
      .json({ 'Nomor Surat': 'Harus Angka', 'Bulan Tujuan': 'Harus Januari' });
  });

  songsRoute(app);

  // books(app);
  // users(app);

  return app;
};
