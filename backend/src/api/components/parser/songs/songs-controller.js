import { errorResponder, errorTypes } from '../../../../core/errors.js';
import { parseSong, putAllSongsInBook } from './songs-service.js';

const allBooks = [
  { book: 'KJ', lim: 478 },
  { book: 'PKJ', lim: 308 },
  { book: 'NKB', lim: 230 },
];

async function getSongs(req, res, next) {
  const { book, num } = req.params;
  try {
    if (!(book && num)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Book or Num is Null'
      );
    }

    return res.status(200).json(await parseSong(book, num));
  } catch (error) {
    return next(error);
  }
}

async function insertDB(req, res, next) {
  const { books, lims } = req.params;
  try {
    if (books && Number(lims)) {
      return res.status(200).json(await putAllSongsInBook(books, Number(lims)));
    }

    const results = await Promise.all(
      allBooks.map(({ book, lim }) => putAllSongsInBook(book, lim))
    );

    return res.status(200).json(results);
  } catch (error) {
    return next(error);
  }
}

function SongsToString(song, lim) {
  if (!lim) {
    return song.lyrics
      .map(({ number, baris }) => {
        return `${number === 'reff' ? 'reff:' : number + '.'} ${baris.map((r) => r + '\n').join('')}`;
      })
      .join('\n');
  }
  const trimmed = lim.replaceAll(/\s/g, '');
  const splited = new Set(trimmed.split(','));
  if (splited.size > 1) {
    return song.lyrics
      .map(({ number, baris }) => {
        if (splited.has(number) || number === 'reff') {
          return `${number === 'reff' ? 'reff:' : number + '.'} ${baris.map((r) => r + '\n').join('')}`;
        }
      })
      .filter((a) => a)
      .join('\n');
  }

  const regexLim = /(\d+)-(\d+)/;
  const range = regexLim.exec(lim);
  if (!range) {
    return song.lyrics
      .map(({ number, baris }) => {
        return `${number === 'reff' ? 'reff:' : number + '.'} ${baris.map((r) => r + '\n').join('')}`;
      })
      .join('\n');
  }

  let a = Number(range[1]);
  const b = Number(range[2]);
  const ranges = new Set(
    Array.from(new Array(b - a + 1), (x, i) => String(i + a))
  );
  return song.lyrics
    .map(({ number, baris }) => {
      if (ranges.has(number) || number === 'reff') {
        return `${number === 'reff' ? 'reff:' : number + '.'} ${baris.map((r) => r + '\n').join('')}`;
      }
    })
    .filter((a) => a)
    .join('\n');
}

async function filterSongs(req, res, next) {
  // console.log(req.body);
  const laguRegex =
    /^(PKJ|KJ|NKB)?\s*(\d+)?\s*(?::\s*(\d+(?:\s*,\s*\d+)*(?:\s*-\s*\d+)?))?\s*(?:["“](.+?)[”"])?/;

  const length = 6;
  const err = {};
  for (let i = 0; i < length; i++) {
    const title = `Song${i + 1}`;
    try {
      const songTitle = req.body[title].trim();
      req.body[title] = songTitle;
      const lagu = laguRegex.exec(songTitle);
      const OriLyrics = req.body[title + '_Lyrics'];

      if (OriLyrics) {
        continue;
      }
      // console.log(songTitle);
      // console.log(lagu);
      if (!lagu[0]) {
        throw errorResponder(
          errorTypes.NO_SONG,
          'Lagu tidak ditemukan, mohon tulis Lyrics dari lagunya.'
        );
      }

      const lyric = await parseSong(lagu[1], Number(lagu[2]));
      const result = SongsToString(lyric, lagu[3]);
      req.body[title + '_Lyrics'] = result;
    } catch (error) {
      err[title] = error.message;
    }
  }
  if (Object.keys(err).length !== 0) {
    return res.status(500).json(err);
  }
  return next();
}

export { getSongs, insertDB, filterSongs };
