import { errorResponder, errorTypes } from '../../../core/errors.js';
import { parseSong, putAllSongsInBook } from './songs-service.js';

async function getSongs(req, res, next) {
  const { book, num } = req.params;
  try {
    if (!(book && num)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Book or Num is Null'
      );
    }


    return res.status(200).json(await parseSongs(book, num));
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

    const allBooks = [
      { book: 'KJ', lim: 478 },
      { book: 'PKJ', lim: 308 },
      { book: 'NKB', lim: 230 },
    ];

    const results = await Promise.all(
      allBooks.map(({ book, lim }) => putAllSongsInBook(book, lim))
    );

    return res.status(200).json(results);
  } catch (error) {
    return next(error);
  }
}

export { getSongs, insertDB };
