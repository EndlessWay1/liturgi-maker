const express = require('express');

const songsRoute = require('./components/songs/songs-route');

module.exports = () => {
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
