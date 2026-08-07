import { errorResponder, errorTypes } from '../../../../core/errors.js';
import { getAyatList } from './ayat-service.js';

export default async (req, res, next) => {
  const { book } = req.params;

  // ayat pattern
  // 1. Mat
  // 2. Mat {num}
  // 3. Mat {num}:{num}
  // 4. Mat {num}:{num}-{num}
  // 5. Mat {num}:{num},{num}-{num}
  // 6. Mat {num}:{num}-{num},{num}-{num}, ...
  // 7. Mat {num}:{num}-{num},{num}:{num}-{num}, ...

  // const testCase = [
  //   '1%20Kor',
  //   '1 Kor 400',
  //   '1 Kor 40:-',
  //   '1 Kor 41:11-',
  //   '1 Kor 42:-11-11',
  //   '1 Kor 431 : -10',
  //   '1 Kor 434 : 11-11',
  //   '1  Kor  41   : 121  -  112',
  //   '1  Kor  41   : 121  -  112, 121:11-1, 11',
  //   '1  Kor  41   : 11  -  112,, 11',
  //   'Yoh 4:15-23,',
  //   book,
  // ];
  try {
    const books = book.trim();

    if (books.length <= 3) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ayat not found');
    }

    const regexs =
      // -----------------Book----------------------------
      /^(\d+)?(?:\s+|%20)?(\w{3})(?:\s+|%20)?(\d+)?(?:\s+|%20)?(?:(?:\:)(?:\s+|%20)?(\d+)(?:(?:\s+|%20)?\-(?:\s+|%20)?(\d+))?)?/;

    const parseAyat = (str) =>
      /(?:\s+|%20)?(\d+)?(?:\s+|%20)?(?:(?:\:)(?:\s+|%20)?(\d+)(?:(?:\s+|%20)?\-(?:\s+|%20)?(\d+))?)?/.exec(
        str
      );

    const parseAyatWithOutEqual = (str) =>
      /(?:\s+|%20)?(\d+)(?:(?:\s+|%20)?\-(?:\s+|%20)?(\d+))?/.exec(str);

    const splited = books.split(',');

    const firstRegex = regexs.exec(books);
    const bookName =
      (firstRegex[1] ? firstRegex[1] + ' ' : '') +
      firstRegex[2].charAt(0).toUpperCase() +
      firstRegex[2].substring(1).toLowerCase();

    const pasNo = firstRegex[3];

    const limA = firstRegex[4];
    const limB = limA && firstRegex[5] ? firstRegex[5] : undefined;

    let hasEqual = pasNo && splited[0].includes(':');

    const find = [
      {
        book: bookName,
        chapter: pasNo,
        verseA: limA,
        verseB: limB,
      },
    ];

    // has more to find
    if (splited.length > 1) {
      let prev = pasNo;
      splited.map((str, idx) => {
        if (idx > 0) {
          let dataAyat, passNo, limA, limB;
          if (str.includes(':')) // with new pass No
          {
            dataAyat = parseAyat(str);
            passNo = dataAyat[1];
            prev = passNo;
            limA = dataAyat[2];
            limB = limA && dataAyat[3] ? dataAyat[3] : undefined;
            hasEqual = !!limA;
          } else {  
            dataAyat = parseAyatWithOutEqual(str);
            passNo = prev;
            limA = dataAyat[1];
            limB = limA && dataAyat[2] ? dataAyat[2] : undefined;
            if (!hasEqual) {
              prev = limA;
              passNo = limA;
              limA = undefined;
              limB = undefined;
            }
          }

          find.push({
            book: bookName,
            chapter: passNo,
            verseA: limA,
            verseB: limB,
          });
        }
      });
    }

    console.log(find);

    const resulted = await Promise.all(
      find.map(
        async ({ book, chapter, verseA, verseB }) =>
          await getAyatList(book, chapter, verseA, verseB)
      )
    );

    return res.status(200).json(resulted);
  } catch (err) {
    return next(err);
  }
};
