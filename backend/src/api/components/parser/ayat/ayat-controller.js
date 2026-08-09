import { errorResponder, errorTypes } from '../../../../core/errors.js';
import { valAyat } from './ayat-service.js';

const ayatController = async (req, res, next) => {
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
    const resulted = await getAyat(book);

    return res.status(200).json(resulted);
  } catch (err) {
    return next(err);
  }
};

const filterAyat = async (req, res, next) => {
  // try atay
  const err = {};
  const ayats = [
    'Verse_Kata_Pembuka',
    'Verse_Berita_Anugerah',
    'Verse_Persembahan',
  ];

  req.body.Firman_duduk = req.body.Verse_Firman.toLowerCase().match(
    /(matius|markus|lukas|yohanes|mat|mar|luk|yoh)/
  )
    ? 'Berdiri'
    : 'Duduk';

  for (const i of ayats) {
    try {
      const ayatnya = req.body[i];
      const isInit = req.body[i + '_Text'];
      if (isInit) {
        continue;
      }
      const resp = await valAyat(ayatnya);

      if (!resp) {
        throw errorResponder(
          errorTypes.NO_PASSAGE,
          'Ayat tidak ditemukan, mohon menulis ayatnya.'
        );
      }
      req.body[i + '_Text'] = resp;
    } catch (error) {
      err[i] = error.message;
    }
  }

  if (Object.keys(err).length !== 0) {
    return res.status(500).json(err);
  }
  return next();
};

export { filterAyat, ayatController };
