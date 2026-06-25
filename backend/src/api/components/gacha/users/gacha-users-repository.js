const { gachaHistory } = require('../../../../models');

// get all of the contents of the table
async function getGachaHis() {
  return gachaHistory.find({});
}

// get all of the contents of the table
async function getGachaHisId(id) {
  return gachaHistory.find({ _id: id });
}

// get all of the contents of the table from a certain periode
async function getGachaPeriodeHis(periode) {
  return gachaHistory.find({ periode });
}

// get all of the contents of the table from a certain name
async function getGachaNameHis(name) {
  return gachaHistory.find({ item: name });
}

// get all of the contents of the table from a certain periode & name
async function getGachaPeriodenNameHis(periode, name) {
  return gachaHistory.find({ periode, item: name });
}

// get all of the wins of the table
async function getGachaWinHis() {
  return gachaHistory.find({ isWin: true });
}

// get all of the periode wins of the table
async function getGachaPeriodeWinHis(periode) {
  return gachaHistory.find({ isWin: true, periode });
}

// get all of the contents of the table
async function getGachaUserHis(email) {
  return gachaHistory.find({ email });
}

// get all of the contents of the table from a certain periode
async function getGachaUsernPeriodeHis(email, periode) {
  return gachaHistory.find({ email, periode });
}

// get all of the contents of the table from a certain name
async function getGachaUsernNameHis(email, name) {
  return gachaHistory.find({ email, item: name });
}

// get all of the contents of the table from a certain periode & name
async function getGachaUsernPeriodenNameHis(email, periode, name) {
  return gachaHistory.find({ email, periode, item: name });
}

// get all of the wins of the table
async function getGachaUserWinHis(email) {
  return gachaHistory.find({ email, isWin: true });
}

// get all of the periode wins of the table
async function getGachaUsernPeriodeWinHis(email, periode) {
  return gachaHistory.find({ email, isWin: true, periode });
}

async function deleteGachaHis(id) {
  return gachaHistory.deleteOne({ _id: id });
}

async function createGachaHis(email, name, periode, date, isWin) {
  return gachaHistory.create({ email, item: name, periode, date, isWin });
}

async function getGachaUsersTimeInThisDay(email, newDate) {
  const startDate = new Date(newDate);
  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);

  const dateMidnight = new Date(newDate);
  dateMidnight.setHours(23);
  dateMidnight.setMinutes(59);
  dateMidnight.setSeconds(59);
  return gachaHistory.aggregate([
    {
      $match: {
        email,
        date: { $gt: startDate, $lt: dateMidnight },
      },
    },
    { $sort: { date: -1 } },
    { $limit: 5 },
  ]);
}

module.exports = {
  // general user
  getGachaHis,
  getGachaPeriodeHis,
  getGachaNameHis,
  getGachaPeriodenNameHis,
  getGachaWinHis,
  getGachaPeriodeWinHis,
  getGachaHisId,
  // specified user
  getGachaUsernPeriodeHis,
  getGachaUserHis,
  getGachaUsernNameHis,
  getGachaUsernPeriodenNameHis,
  getGachaUserWinHis,
  getGachaUsernPeriodeWinHis,
  // deletion & creation
  deleteGachaHis,
  createGachaHis,
  getGachaUsersTimeInThisDay,
};
