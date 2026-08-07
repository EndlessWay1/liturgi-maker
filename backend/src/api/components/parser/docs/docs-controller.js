import { errorResponder, errorTypes } from '../../../../core/errors.js';
import { parseLiturgi, parseDocs, parseJadwal } from './docs-service.js';

async function docsLiturgi(req, res, next) {
  const { link } = req.body;

  try {
    if (!link)
      throw errorResponder(errorTypes.NO_LINK, 'There is no link in body.');
    const data = await parseDocs(link);

    res.status(200).json(parseLiturgi(data));
  } catch (err) {
    return next(err);
  }
}

async function docsJadwal(req, res, next) {
  const { link } = req.body;

  try {
    if (!link)
      throw errorResponder(errorTypes.NO_LINK, 'There is no link in body.');
    const data = await parseDocs(link);

    res.status(200).json(parseJadwal(data));
  } catch (err) {
    return next(err);
  }
}

export { docsLiturgi, docsJadwal };
