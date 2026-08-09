import { errorResponder, errorTypes } from '../../../../core/errors.js';

const PassageList = [
  {
    no: 1,
    abbr: 'Kej',
    name: 'Kejadian',
    chapter: 50,
  },
  {
    no: 2,
    abbr: 'Kel',
    name: 'Keluaran',
    chapter: 40,
  },
  {
    no: 3,
    abbr: 'Ima',
    name: 'Imamat',
    chapter: 27,
  },
  {
    no: 4,
    abbr: 'Bil',
    name: 'Bilangan',
    chapter: 36,
  },
  {
    no: 5,
    abbr: 'Ula',
    name: 'Ulangan',
    chapter: 34,
  },
  {
    no: 6,
    abbr: 'Yos',
    name: 'Yosua',
    chapter: 24,
  },
  {
    no: 7,
    abbr: 'Hak',
    name: 'Hakim-hakim',
    chapter: 21,
  },
  {
    no: 8,
    abbr: 'Rut',
    name: 'Rut',
    chapter: 4,
  },
  {
    no: 9,
    abbr: '1 Sam',
    name: '1 Samuel',
    chapter: 31,
  },
  {
    no: 10,
    abbr: '2 Sam',
    name: '2 Samuel',
    chapter: 24,
  },
  {
    no: 11,
    abbr: '1 Raj',
    name: '1 Raja-Raja',
    chapter: 22,
  },
  {
    no: 12,
    abbr: '2 Raj',
    name: '2 Raja-Raja',
    chapter: 25,
  },
  {
    no: 13,
    abbr: '1 Taw',
    name: '1 Tawarikh',
    chapter: 29,
  },
  {
    no: 14,
    abbr: '2 Taw',
    name: '2 Tawarikh',
    chapter: 36,
  },
  {
    no: 15,
    abbr: 'Ezr',
    name: 'Ezra',
    chapter: 10,
  },
  {
    no: 16,
    abbr: 'Neh',
    name: 'Nehemia',
    chapter: 13,
  },
  {
    no: 17,
    abbr: 'Est',
    name: 'Ester',
    chapter: 10,
  },
  {
    no: 18,
    abbr: 'Ayb',
    name: 'Ayub',
    chapter: 42,
  },
  {
    no: 19,
    abbr: 'Maz',
    name: 'Mazmur',
    chapter: 150,
  },
  {
    no: 20,
    abbr: 'Ams',
    name: 'Amsal',
    chapter: 31,
  },
  {
    no: 21,
    abbr: 'Pkh',
    name: 'Pengkhotbah',
    chapter: 12,
  },
  {
    no: 22,
    abbr: 'Kid',
    name: 'Kidung Agung',
    chapter: 8,
  },
  {
    no: 23,
    abbr: 'Yes',
    name: 'Yesaya',
    chapter: 66,
  },
  {
    no: 24,
    abbr: 'Yer',
    name: 'Yeremia',
    chapter: 52,
  },
  {
    no: 25,
    abbr: 'Rat',
    name: 'Ratapan',
    chapter: 5,
  },
  {
    no: 26,
    abbr: 'Yeh',
    name: 'Yehezkiel',
    chapter: 48,
  },
  {
    no: 27,
    abbr: 'Dan',
    name: 'Daniel',
    chapter: 12,
  },
  {
    no: 28,
    abbr: 'Hos',
    name: 'Hosea',
    chapter: 14,
  },
  {
    no: 29,
    abbr: 'Yoe',
    name: 'Yoel',
    chapter: 3,
  },
  {
    no: 30,
    abbr: 'Amo',
    name: 'Amos',
    chapter: 9,
  },
  {
    no: 31,
    abbr: 'Oba',
    name: 'Obaja',
    chapter: 1,
  },
  {
    no: 32,
    abbr: 'Yun',
    name: 'Yunus',
    chapter: 4,
  },
  {
    no: 33,
    abbr: 'Mik',
    name: 'Mikha',
    chapter: 7,
  },
  {
    no: 34,
    abbr: 'Nah',
    name: 'Nahum',
    chapter: 3,
  },
  {
    no: 35,
    abbr: 'Hab',
    name: 'Habakuk',
    chapter: 3,
  },
  {
    no: 36,
    abbr: 'Zef',
    name: 'Zefanya',
    chapter: 3,
  },
  {
    no: 37,
    abbr: 'Hag',
    name: 'Hagai',
    chapter: 2,
  },
  {
    no: 38,
    abbr: 'Zak',
    name: 'Zakharia',
    chapter: 14,
  },
  {
    no: 39,
    abbr: 'Mal',
    name: 'Maleakhi',
    chapter: 4,
  },
  {
    no: 40,
    abbr: 'Mat',
    name: 'Matius',
    chapter: 28,
  },
  {
    no: 41,
    abbr: 'Mar',
    name: 'Markus',
    chapter: 16,
  },
  {
    no: 42,
    abbr: 'Luk',
    name: 'Lukas',
    chapter: 24,
  },
  {
    no: 43,
    abbr: 'Yoh',
    name: 'Yohanes',
    chapter: 21,
  },
  {
    no: 44,
    abbr: 'Kis',
    name: 'Kisah Para Rasul',
    chapter: 28,
  },
  {
    no: 45,
    abbr: 'Rom',
    name: 'Roma',
    chapter: 16,
  },
  {
    no: 46,
    abbr: '1 Kor',
    name: '1 Korintus',
    chapter: 16,
  },
  {
    no: 47,
    abbr: '2 Kor',
    name: '2 Korintus',
    chapter: 13,
  },
  {
    no: 48,
    abbr: 'Gal',
    name: 'Galatia',
    chapter: 6,
  },
  {
    no: 49,
    abbr: 'Efe',
    name: 'Efesus',
    chapter: 6,
  },
  {
    no: 50,
    abbr: 'Flp',
    name: 'Filipi',
    chapter: 4,
  },
  {
    no: 51,
    abbr: 'Kol',
    name: 'Kolose',
    chapter: 4,
  },
  {
    no: 52,
    abbr: '1 Tes',
    name: '1 Tesalonika',
    chapter: 5,
  },
  {
    no: 53,
    abbr: '2 Tes',
    name: '2 Tesalonika',
    chapter: 3,
  },
  {
    no: 54,
    abbr: '1 Tim',
    name: '1 Timotius',
    chapter: 6,
  },
  {
    no: 55,
    abbr: '2 Tim',
    name: '2 Timotius',
    chapter: 4,
  },
  {
    no: 56,
    abbr: 'Tit',
    name: 'Titus',
    chapter: 3,
  },
  {
    no: 57,
    abbr: 'Flm',
    name: 'Filemon',
    chapter: 1,
  },
  {
    no: 58,
    abbr: 'Ibr',
    name: 'Ibrani',
    chapter: 13,
  },
  {
    no: 59,
    abbr: 'Yak',
    name: 'Yakobus',
    chapter: 5,
  },
  {
    no: 60,
    abbr: '1 Pet',
    name: '1 Petrus',
    chapter: 5,
  },
  {
    no: 61,
    abbr: '2 Pet',
    name: '2 Petrus',
    chapter: 3,
  },
  {
    no: 62,
    abbr: '1 Yoh',
    name: '1 Yohanes',
    chapter: 5,
  },
  {
    no: 63,
    abbr: '2 Yoh',
    name: '2 Yohanes',
    chapter: 1,
  },
  {
    no: 64,
    abbr: '3 Yoh',
    name: '3 Yohanes',
    chapter: 1,
  },
  {
    no: 65,
    abbr: 'Yud',
    name: 'Yudas',
    chapter: 1,
  },
  {
    no: 66,
    abbr: 'Wah',
    name: 'Wahyu',
    chapter: 22,
  },
];

const chapterCache = new Map(); // key: `${abr}:${cptr}` -> { data, expiry }

const getAyatList = async (abr, cptr, ayt_a, ayt_b) => {
  if (!ayt_b) ayt_b = ayt_a;

  const cacheKey = `${abr}:${cptr}`;
  let data = chapterCache.get(cacheKey);

  if (!data) {
    const res = await fetch(
      `https://beeble.vercel.app/api/v1/passage/${abr}/${cptr}?ver=tb`,
      { signal: AbortSignal.timeout(4000) }
    );

    if (!res.ok) {
      throw errorResponder(
        errorTypes.FETCH_ERROR,
        'Fetching error, please try again.'
      );
    }

    const json = await res.json();
    if (Object.keys(json).length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ayat was not found');
    }

    data = { value: json };
    chapterCache.set(cacheKey, data);
  }

  const ayats = data.value.data.verses;
  const ret1 = ayats.filter(
    ({ verse, type }) => type === 'content' && verse >= ayt_a && verse <= ayt_b
  );

  return { book: abr, chapter: cptr, verse: ayt_a ? ret1 : ayats };
};

const superscript = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
};
// convert ayat into abbr type if not already
const nameToAbbr = (ayat) => {
  const passageRegex = /^(\d+)?(?:\s+|%20)?([^0-9:]+)*/;
  const passageMap = {};
  for (const i of PassageList) {
    const abbrs = i.abbr.toLowerCase();
    passageMap[i.name.toLowerCase()] = abbrs;
  }
  const lowAyat = ayat.toLowerCase();
  const matches = lowAyat.match(passageRegex);
  if (matches) {
    const ayats =
      (matches[1] ? matches[1] + ' ' : '') + matches[2].toLowerCase().trim();
    const ress = passageMap[ayats];
    const ayatToBeReplace = matches[1] ? ress.substring(2) : ress;
    return lowAyat.replace(matches[2], ayatToBeReplace);
  }
  return lowAyat;
};

const ayatSubscript = (num) => {
  const a = String(num);
  const len = a.length;
  let empty = '';
  for (let i = 0; i < len; i++) {
    empty += superscript[a.charAt(i)];
  }
  return empty;
};

const getAyat = async (ayat) => {
  const books = nameToAbbr(ayat.trim());

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
  const resulted = Promise.all(
    find.map(async ({ book, chapter, verseA, verseB }) =>
      getAyatList(book, chapter, verseA, verseB)
    )
  );
  return resulted;
};

const valAyat = async (ayat) => {
  const resulted = await getAyat(ayat);

  const content = [];

  for (const res of resulted) {
    let subStr = [];
    for (const verse of res.verse) {
      subStr.push(ayatSubscript(verse.verse) + verse.content);
    }
    subStr.length > 0 && content.push('"' + subStr.join(' ') + '"');
  }
  return content.join(',\n');
};

export { PassageList, getAyatList, valAyat, getAyat };
