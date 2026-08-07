import { JSDOM } from 'jsdom';
import { errorResponder, errorTypes } from '../../../../core/errors.js';

// for liturgi & jadwal
const MONTHS_TO_INT = {
  JANUARI: '1',
  FEBRUARI: '2',
  MARET: '3',
  APRIL: '4',
  MEI: '5',
  JUNI: '6',
  JULI: '7',
  AGUSTUS: '8',
  SEPTEMBER: '9',
  OKTOBER: '10',
  NOVEMBER: '11',
  DESEMBER: '12',
};

// for liturgi
const setOfKeys = new Set([
  'Tema',
  'Ayat Firman',
  'Ayat KP',
  'Ayat BA',
  'Ayat Persembahan',
]);

// for jadwal
const MONTHS_SET = new Set([
  'JANUARI',
  'FEBRUARI',
  'MARET',
  'APRIL',
  'MEI',
  'JUNI',
  'JULI',
  'AGUSTUS',
  'SEPTEMBER',
  'OKTOBER',
  'NOVEMBER',
  'DESEMBER',
]);

/**
 * Parse a docs link text
 * @param {string} link - The link to be fetched
//  * @returns {string[]}
 */
const parseDocs = async (link) => {
  const res = await fetch(link);
  if (!res.ok) {
    throw errorResponder(errorTypes.FETCH_ERROR, 'Error fetching the link.');
  }
  const bodys = await res.text();
  const parser = new JSDOM(bodys);

  const regexes = /([\w\.()@!#$%\^\&\*\[\]:\-\+=_{};\'‘’\"“”,?|<>~`]+)/g;

  const delim = 'DOCS_modelChunk = ';
  const json_file = [
    ...parser.window.document.querySelectorAll('script[nonce]'),
  ]
    .map((str) => str.textContent)
    .filter((str) => str.includes(delim))
    .map((str) => {
      const docs_script = str.split('; DOCS_modelChunkLoadStart', 1)[0];
      return docs_script.startsWith(delim)
        ? docs_script.slice(delim.length)
        : docs_script;
    })
    .map((str) => JSON.parse(str));

  let docs_text = '';

  for (const json_f of json_file) {
    for (const key of json_f.chunk) {
      if (key.hasOwnProperty('s')) {
        docs_text += key.s + '\n';
      }
    }
  }

  // console.log(docs_text);
  if (docs_text === '') {
    throw errorResponder(
      errorTypes.PARSE_DOCS,
      'Error parsing the docs, there is no Body'
    );
  }

  const docs_split = docs_text.split('\n');

  const doc_text = [];

  for (const i of docs_split) {
    const res = i.match(regexes);
    res && doc_text.push(res.join(' '));
  }

  return doc_text;
};

const parseLiturgi = (arrText) => {
  const length = arrText.length;

  let j = 0;

  const resultingMonth = {};

  const dateRegex = /^(\d+) (\w+) (\d+).*?/;

  const captureRegex = /^([A-Za-z ]+):(.*?)$/;

  const subRegex1 = /[\u201c\u201d]/;

  const subRegex2 = /[\u2019\u2018]/;

  const fokusRegex = /^([^\:0-9]+)$/;

  const songRegex = /(\d+)\.(.*?)$/;

  const cleanQuote = (text) =>
    text.replace(subRegex1, '"').replace(subRegex2, "'").trim();

  while (j < length) {
    // get first line
    const dayMonYear = arrText[j].match(dateRegex);
    if (dayMonYear) {
      const semiDict = {};

      j++;

      while (j < length && !arrText[j].match(dateRegex)) {
        const keyInSet = arrText[j].match(captureRegex);
        if (keyInSet) {
          const grp1 = keyInSet[1].trim();
          if (setOfKeys.has(grp1)) {
            semiDict[grp1] = cleanQuote(keyInSet[2]);
          } else if (grp1 === 'Fokus') {
            const currFok = [];
            j++;
            while (j < length) {
              const matches = arrText[j].match(fokusRegex);
              if (!matches) break;

              currFok.push(cleanQuote(matches[1]));
              j++;
            }

            if (currFok.length > 0) {
              j--;
            }
            semiDict[grp1] = currFok;
          } else if (grp1 === 'Lagu') {
            const songDic = {};
            while (j < length && !arrText[j].match(dateRegex)) {
              j += 1;

              while (j < length) {
                const songs = arrText[j].match(songRegex);
                if (!songs) break;

                songDic[songs[1]] = cleanQuote(songs[2]);
                j++;
              }
            }
            semiDict[grp1] = songDic;
            continue;
          }
        }
        j++;
      }
      const month = dayMonYear[2];
      const monInt = MONTHS_TO_INT[dayMonYear[2].toUpperCase()];
      const mon = resultingMonth[monInt];
      if (!mon) {
        resultingMonth[monInt] = {};
      }
      resultingMonth[monInt][dayMonYear[1]] = semiDict;
    } else {
      j++;
    }
  }
  return resultingMonth;
};

const parseJadwal = (arrText) => {
  const jadwal = {};
  const length = arrText.length;

  let i = 0;

  const monthRegex = /^([^0-9 ]+)/;

  const dateRegex = /^(\d+)$/;

  const textRegex = /^(Tanggal|Pendeta)$/;

  const monDateRegex = /^([^0-9 ]+ \d+)/;

  while (i < length) {
    const month = arrText[i].match(monthRegex);
    if (!month) {
      i++;
      continue;
    }
    const curMon = month[1];

    if (!MONTHS_SET.has(curMon)) {
      i++;
      continue;
    }

    const monDic = {};
    i++;
    while (i < length && arrText[i].match(textRegex)) {
      i++;
    }

    while (i < length) {
      const number = arrText[i].match(dateRegex);
      if (!number) break;

      i++;
      const s = [];
      while (
        i < length &&
        !arrText[i].match(monDateRegex) &&
        !arrText[i].match(textRegex) &&
        !arrText[i].match(dateRegex)
      ) {
        s.push(arrText[i]);
        i++;
      }
      monDic[number[1]] = s.join(' ');
    }
    jadwal[MONTHS_TO_INT[curMon]] = monDic;
  }
  return jadwal;
};

export { parseDocs, parseLiturgi, parseJadwal };
