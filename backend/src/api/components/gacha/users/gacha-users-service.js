/* eslint-disable no-bitwise */
const gachaUsersRepository = require('./gacha-users-repository');

async function isGachaHisExist(id) {
  const his = await gachaUsersRepository.getGachaHisId(id);
  return !!his; // return true if exist, else false
}

async function getGachaLossHisLength() {
  return (
    gachaUsersRepository.getGachaHis().length -
    gachaUsersRepository.getGachaWinHis().length
  );
}

async function getGachaWinHisLength() {
  return gachaUsersRepository.getGachaWinHis().length;
}

async function getGachaHisLength() {
  return gachaUsersRepository.getGachaHis().length;
}

async function getGachaUserLossHisLength(email) {
  return (
    gachaUsersRepository.getGachaUserHis(email).length -
    gachaUsersRepository.getGachaUserWinHis(email).length
  );
}

async function getGachaUserWinHisLength(email) {
  return gachaUsersRepository.getGachaUserWinHis(email).length;
}

async function getGachaUserHisLength(email) {
  return gachaUsersRepository.getGachaUserHis(email).length;
}

async function createGachaHis(email, name, periode, isWin) {
  const currDate = Date.now();
  return gachaUsersRepository.createGachaHis(
    email,
    name,
    periode,
    currDate,
    isWin
  );
}

async function deleteGachaHis(id) {
  return gachaUsersRepository.deleteGachaHis(id);
}

async function getGachaUsersTimeInThisDay(email, newDay) {
  return gachaUsersRepository.getGachaUsersTimeInThisDay(email, newDay);
}

// use a query based function
async function getQGachaHis(UserEmail, Win, Periode, Name) {
  let bit = (UserEmail !== undefined) << 1;
  bit = (bit | (Win !== undefined && Win !== false)) << 1;
  bit = (bit | (Periode !== undefined)) << 1;
  bit |= Name !== undefined;

  let promises;
  switch (bit) {
    // all false
    case 0b0000: {
      promises = gachaUsersRepository.getGachaHis();
      break;
    }
    // get name in his
    case 0b0001: {
      promises = gachaUsersRepository.getGachaNameHis(Name);
      break;
    }
    // get periode in his
    case 0b0010: {
      promises = gachaUsersRepository.getGachaPeriodeHis(Periode);
      break;
    }
    // get periode n name in his
    case 0b0011: {
      promises = gachaUsersRepository.getGachaPeriodenNameHis(Periode, Name);
      break;
    }
    // get win his
    case 0b0100: {
      promises = gachaUsersRepository.getGachaWinHis();
      break;
    }
    // get win his & name
    case 0b0101: {
      const item = await gachaUsersRepository.getGachaNameHis(Name);
      promises = Promise.resolve(item.filter((i) => i.isWin === true));
      break;
    }
    // get win his & periode
    case 0b0110: {
      promises = gachaUsersRepository.getGachaPeriodeWinHis(Periode);
      break;
    }
    // get win his periode & Name
    case 0b0111: {
      const item = await gachaUsersRepository.getGachaPeriodenNameHis(
        Periode,
        Name
      );
      promises = Promise.resolve(item.filter((i) => i.isWin === true));
      break;
    }
    // get email his
    case 0b1000: {
      promises = gachaUsersRepository.getGachaUserHis(UserEmail);
      break;
    }
    // get user his & name
    case 0b1001: {
      promises = gachaUsersRepository.getGachaUsernNameHis(UserEmail, Name);
      break;
    }
    // get user his periode
    case 0b1010: {
      promises = gachaUsersRepository.getGachaUsernPeriodeHis(
        UserEmail,
        Periode
      );
      break;
    }
    // get user his periode & win
    case 0b1011: {
      promises = gachaUsersRepository.getGachaUsernPeriodenNameHis(
        UserEmail,
        Periode,
        Name
      );
      break;
    }
    // get user his wins
    case 0b1100: {
      promises = gachaUsersRepository.getGachaUserWinHis(UserEmail);
      break;
    }
    // get user his wins by names
    case 0b1101: {
      const item = await gachaUsersRepository.getGachaUsernNameHis(
        UserEmail,
        Name
      );
      promises = Promise.resolve(item.filter((i) => i.isWin === true));
      break;
    }
    // get user his wins by periode
    case 0b1110: {
      promises = gachaUsersRepository.getGachaUsernPeriodeWinHis(
        UserEmail,
        Periode
      );
      break;
    }
    // get user his wins by names & periode
    case 0b1111: {
      promises = gachaUsersRepository.getGachaUsernPeriodenNameHis(
        UserEmail,
        Periode,
        Name
      );
      break;
    }

    default:
      promises = [];
  }
  return promises;
}

module.exports = {
  isGachaHisExist,
  getGachaLossHisLength,
  getGachaWinHisLength,
  getGachaHisLength,
  getGachaUserLossHisLength,
  getGachaUserWinHisLength,
  getGachaUserHisLength,
  deleteGachaHis,
  getGachaUsersTimeInThisDay,
  createGachaHis,
  getQGachaHis,
};
