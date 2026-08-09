import { errorResponder, errorTypes } from '../../../core/errors.js';
import { makeTemplate } from './docs-maker-service.js';

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

const makeDocs = async (req, res) => {
  //   console.log(req.body);
  const buff = await makeTemplate(req.body);
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );

  res.send(buff);
};

export { filterHead, makeDocs };
