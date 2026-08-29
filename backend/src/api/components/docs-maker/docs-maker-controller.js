import { errorResponder, errorTypes } from '../../../core/errors.js';
import {
  makeLiturgiTemplate,
  makeSuratTemplate,
} from './docs-maker-service.js';
import PizZip from 'pizzip';

const namaBulan = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const filterHead = (req, res, next) => {
  //   console.log(req.body);
  const err = {};
  const heads = ['Tema', 'Pendeta', 'Penatua'];
  for (const i of heads) {
    try {
      if (!req.body[i]) {
        throw errorResponder(errorTypes.NOT_FOUND, `${i} was not found.`);
      }
    } catch (error) {
      err[i] = error.message;
    }
  }

  const tanggal = /^(\d+)-(\d+)-(\d+)$/.exec(req.body.Tanggal);
  if (!tanggal) {
    err.Tanggal = 'Invalid date';
  } else {
    const year = tanggal[1];
    const mon = namaBulan[Number(tanggal[2]) - 1];
    const day = Number(tanggal[3]);
    req.body.Tanggal = `${day} ${mon} ${year}`;
  }

  if (req.body.Pelayanan_Pujian) {
    req.body.Pelayanan_Pujian = '\nPELAYANAN PUJIAN';
  } else {
    req.body.Pelayanan_Pujian = '';
  }

  if (Object.keys(err).length !== 0) {
    return res.status(500).json(err);
  }

  return next();
};

const makeLiturgi = async (req, res) => {
  //   console.log(req.body);

  const isPendeta = req.body.Pendeta.match(/(Pdt|TPG)/);
  const kita = isPendeta ? 'engkau' : 'kita';
  const kitaWithSpace = isPendeta ? 'mu' : ' kita';

  const buff = await makeLiturgiTemplate({ ...req.body, kita, kitaWithSpace });
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );

  res.send(buff);
};

const toRoman = (number) => {
  const roman = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
  };
  const num = String(number);
  let power = num.length - 1;
  const lengthStr = num.length;
  let re = '';

  for (let i = 0; i < lengthStr; i++) {
    const cur = 10 ** power;
    const chars = num.charAt(i);
    const rom = Number(chars);
    power -= 1;

    if (chars === '9' || chars === '4') {
      re += roman[rom * cur];
    } else if (rom >= 5) {
      re += roman[cur * 5];
      re += roman[cur].repeat(rom - 5);
    } else {
      re += roman[cur].repeat(rom);
    }
  }
  return re;
};

const filterSurat = async (req, res, next) => {
  const { 'Nomor Surat': No, 'Bulan Tujuan': Month } = req.body;
  const err = {};

  if (!No || Number(No) <= 0) {
    err['Nomor Surat'] = 'Invalid Nomor Surat';
  }

  const mon = namaBulan.indexOf(Month) + 1;
  // console.log(req.body['Bulan Tujuan']);
  // console.log(req.body['Nomor Surat']);
  // console.log(mon);
  if (mon <= 0) {
    err['Bulan Tujuan'] = 'Bulan harus diisi';
  }
  if (!Object.prototype.hasOwnProperty.call(req.body.Liturgi, mon)) {
    err['Link Liturgi'] = 'Bulan tidak ada di Liturgi';
  }

  if (!Object.prototype.hasOwnProperty.call(req.body.Jadwal, mon)) {
    err['Link Jadwal Pendeta'] = 'Bulan tidak ada di Jadwal Pendeta';
  }

  if (Object.keys(err).length !== 0) {
    return res.status(500).json(err);
  }
  const date = new Date();

  req.body.Liturgi = req.body.Liturgi[mon];
  req.body.Jadwal = req.body.Jadwal[mon];
  req.body.NoSurat = Number(No);
  req.body.SysDate = `${date.getDate()} ${namaBulan[date.getMonth() - 1]} ${date.getFullYear()}`;
  req.body.SysYear = `${date.getFullYear()}`;
  req.body.SysMon = toRoman(mon);
  req.body.Month = Month;

  return next();
};

const makeSurat = async (req, res) => {
  const { NoSurat, SysMon, SysYear, SysDate, Liturgi, Jadwal, Month } =
    req.body;

  const zip = new PizZip();

  let offset = 0;
  const lap = [];
  for (const day in Liturgi) {
    const curData = Liturgi[day];
    const NamaPF = Jadwal[day];
    const DueDate = `Minggu, ${day} ${Month} ${SysYear}`;
    const Theme = curData['Tema'];
    const BacaanAlkitab = curData['Ayat Firman'];
    const FokusTema = curData['Fokus'].map((val) => {
      return {
        name: val,
      };
    });
    if (!Theme || !BacaanAlkitab || !FokusTema) {
      continue;
    }

    console.log({
      NoSurat: NoSurat + offset,
      SysMon,
      SysYear,
      SysDate,
      NamaPF,
      DueDate,
      Theme,
      FokusTema,
      BacaanAlkitab,
    });

    const doc = makeSuratTemplate({
      NoSurat: NoSurat + offset,
      SysMon,
      SysYear,
      SysDate,
      NamaPF,
      DueDate,
      Theme,
      FokusTema,
      BacaanAlkitab,
    });
    lap.push(
      `{${NoSurat + offset}/KR GKI PC 1/${SysMon}/${SysYear}}, ${SysDate}. Konfirmasi Pelayanan ${NamaPF} untuk Kebaktian Remaja pada tanggal ${DueDate}.`
    );
    zip.file(`Surat Pelayan Firman ${DueDate}.docx`, doc);
    offset += 1;
  }

  zip.file('Laporan.txt', lap.join('\n'));

  const content = zip.generate({ type: 'nodebuffer' });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="Surat Pendeta ${Month}.zip"`
  );

  res.send(content);
};

export { filterHead, makeLiturgi, filterSurat, makeSurat };
