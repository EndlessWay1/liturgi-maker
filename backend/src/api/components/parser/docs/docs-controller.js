import { errorResponder, errorTypes } from '../../../../core/errors.js';
import { parseLiturgi, parseDocs, parseJadwal } from './docs-service.js';

async function getLiturgi(link) {
  if (!link)
    throw errorResponder(errorTypes.NO_LINK, 'There is no link in body.');
  return parseLiturgi(await parseDocs(link));
}

async function docsLiturgi(req, res, next) {
  const { link } = req.body;
  try {
    res.status(200).json(await getLiturgi(link));
  } catch (err) {
    return res
      .status(err.statusCode ?? 404)
      .json({ 'Link Liturgi': err.message || err.description });
  }
}

async function getJadwal(link) {
  if (!link)
    throw errorResponder(errorTypes.NO_LINK, 'There is no link in body.');
  return parseJadwal(await parseDocs(link));
}

async function docsJadwal(req, res, next) {
  const { link } = req.body;
  try {
    res.status(200).json(await getJadwal(link));
  } catch (err) {
    return res
      .status(err.statusCode ?? 404)
      .json({ 'Link Jadwal Pendeta': err.message || err.description });
    }
  }
  
  async function filterLink(req, res, next) {
    const {"Link Liturgi": linkLiturgi, "Link Jadwal Pendeta": linkJadwal} = req.body;

  // get Liturgi
  try {
    req.body.Liturgi = await getLiturgi(linkLiturgi);
  } catch (err) {
    return res
      .status(err.statusCode ?? 404)
      .json({ 'Link Liturgi': err.message || err.description });
    
  }
  // get Jadwal
  try {
    req.body.Jadwal = await getJadwal(linkJadwal);
  } catch (err) {
    return res
      .status(err.statusCode ?? 404)
      .json({ 'Link Jadwal Pendeta': err.message || err.description });
    
  }

  return next();
}

export { docsLiturgi, docsJadwal, filterLink };
