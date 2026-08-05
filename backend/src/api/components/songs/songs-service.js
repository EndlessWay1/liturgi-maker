/* eslint-disable no-await-in-loop */
// get song lyrics

// eslint-disable-next-line import/extensions
const { JSDOM } = require('jsdom');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { createSong, songExist } = require('./songs-repository');

const parseSong = async (book, num) => {
  const response = await fetch(`https://alkitab.app/${book}/${num}`);
  if (!response.ok) {
    throw errorResponder(errorTypes.NO_SONG);
  }

  const bodys = await response.text();

  // parses the html
  const parser = new JSDOM(bodys);

  // Parse the TrustedHTML (which contains a trusted string)

  const isError = String(
    parser.window.document.getRootNode.textContent
  ).includes('no such song:');

  if (isError) {
    throw errorResponder(errorTypes.NO_SONG);
  }

  const title = parser.window.document.querySelector('.judul')?.textContent;

  const lyrics = [...parser.window.document.querySelectorAll('.bait')]
    .map((bait) => {
      const baitNo = bait.querySelector('.bait-no');
      return {
        number: baitNo ? baitNo.textContent.trim() : 'reff',
        baris: [...bait.querySelectorAll('.baris')].map((k) =>
          k.textContent.trim()
        ),
      };
    })
    .filter(({ number }, idx) => !(number === 'reff' && idx > 1));

  return { title, lyrics, book, number: num };
};

const putAllSongsInBook = async (book, lim) => {
  const created = [];
  const skipped = [];
  const failed = [];

  for (let i = 1; i <= lim; i += 1) {
    try {
      if (await songExist(book, i)) {
        skipped.push(`${book}:${i}`);
      } else {
        const song = await parseSong(book, i);
        await createSong(song);

        created.push(`${book}:${i}`);
      }
    } catch (err) {
      failed.push(`${book}:${i}`);
    }
  }

  return { created, skipped, failed };
};

module.exports = { parseSong, putAllSongsInBook };
