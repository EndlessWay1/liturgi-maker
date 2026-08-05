const { Songs } = require('../../../models');

async function getSongs() {
  return Songs.find({});
}

async function getSongByBookNum(book, num) {
  return Songs.findOne({ book, number: num });
}

async function songExist(book, num) {
  return Songs.exists({ book, number: num });
}

async function createSong(songs) {
  return Songs.create(songs);
}

module.exports = {
  getSongs,
  getSongByBookNum,
  createSong,
  songExist,
};
