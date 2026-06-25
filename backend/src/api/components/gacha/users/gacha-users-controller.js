/* eslint-disable no-bitwise */
const gachaItemsService = require('../items/gacha-items-service');
const gachaUsersService = require('./gacha-users-service');
const UsersService = require('../../users/users-service');
const { errorResponder, errorTypes } = require('../../../../core/errors');
const { censorText, sampleRes } = require('../../../../utils/gacha');
const { passwordMatched } = require('../../../../utils/password');

async function getUserGachaHis(req, res, next) {
  try {
    const { id } = req.params;
    const { item, periode } = req.query;

    const isValid = await UsersService.getUser(id);
    if (!isValid) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const UserEmail = isValid.email;
    // function getQGachaHis already accounted for undefines in item & periode
    const success = await gachaUsersService.getQGachaHis(
      UserEmail,
      undefined,
      periode,
      item
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'An error has occured'
      );
    }

    return res.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

// the same as above, but win only
async function getUserGachaWinHis(req, res, next) {
  try {
    const { id } = req.params;
    const { item, periode } = req.query;

    const isValid = await UsersService.getUser(id);
    if (!isValid) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const UserEmail = isValid.email;
    // function getQGachaHis already accounted for undefines in item & periode
    const success = await gachaUsersService.getQGachaHis(
      UserEmail,
      true,
      periode,
      item
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'An error has occured'
      );
    }

    return res.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

// the same as above, but win only
async function getGachaWin(req, res, next) {
  try {
    const { item, periode } = req.query;

    // function getQGachaHis already accounted for undefines in item & periode
    const success = await gachaUsersService.getQGachaHis(
      undefined,
      true,
      periode,
      item
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'An error has occured'
      );
    }

    const returnData = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const emails of success) {
      // eslint-disable-next-line no-restricted-syntax, no-await-in-loop
      const user = await UsersService.getUserByEmail(emails.email);
      if (!user) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Unknown email address'
        );
      }
      returnData.push({
        name: censorText(user.fullName),
        periode: emails.periode,
        item: emails.item,
        date: emails.date,
      });
    }

    return res.status(200).json(returnData);
  } catch (error) {
    return next(error);
  }
}

async function doGacha(req, res, next) {
  try {
    const { email, password, periode } = req.body;

    const isValid = await UsersService.getUserByEmail(email);
    if (!(isValid && passwordMatched(password, isValid.password))) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const latestGacha = await gachaUsersService.getGachaUsersTimeInThisDay(
      email,
      Date.now()
    );

    // get gacha pool from a certain periode
    const GachaPool = await gachaItemsService.getQItems(
      true,
      periode,
      undefined,
      undefined
    );

    // if gachapool is empty
    if (!GachaPool) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gacha Pool is empty for this periode'
      );
    }
    if (latestGacha && latestGacha.length >= 5) {
      throw errorResponder(
        errorTypes.VALIDATION,
        `Sorry, you've done 5 Gacha today, please try again tomorrow`
      );
    }

    // do gacha
    const gachaRes = sampleRes(GachaPool);
    // Change the quantity of periode
    const succ = await gachaItemsService.chageQuantity(
      // eslint-disable-next-line no-underscore-dangle
      gachaRes._id,
      gachaRes.quantity - 1
    );

    if (!succ) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Unable to change quantity'
      );
    }

    // put history
    const success = await gachaUsersService.createGachaHis(
      email,
      gachaRes.item,
      periode,
      gachaRes.isWin
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Unable to insert into db'
      );
    }

    return res.status(200).json({
      message: gachaRes.isWin
        ? `Cougratulation, you've won a ${gachaRes.item}`
        : 'Sorry you get nothing, try again next time!',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  doGacha,
  getGachaWin,
  getUserGachaWinHis,
  getUserGachaHis,
};
