const { gachaItems } = require('../../../../models');

// find items greater than 0 available
async function getValidItems() {
  return gachaItems.find({ quantity: { $gt: 0 } });
}

async function getValidItemsByPeriod(periode) {
  return gachaItems.find({ quantity: { $gt: 0 }, periode });
}

async function getValidItemsByName(name) {
  return gachaItems.find({ quantity: { $gt: 0 }, item: name });
}

// find items greater than 0 available
async function getValidWinItems() {
  return gachaItems.find({ quantity: { $gt: 0 }, isWin: true });
}

async function getValidWinItemsByPeriod(periode) {
  return gachaItems.find({ quantity: { $gt: 0 }, periode, isWin: true });
}

// find all items
async function getItems() {
  return gachaItems.find({});
}

// find all items by periode
async function getItemsByPeriod(periode) {
  return gachaItems.find({ periode });
}

// find all item by periode & name
async function getItemByPeriodnName(periode, name) {
  return gachaItems.findOne({ periode, item: name });
}

// find all items by name
async function getItemsByName(name) {
  return gachaItems.find({ item: name });
}

// create new unique item
async function createItem(periode, item, quantity) {
  return gachaItems.create({ periode, item, quantity });
}

// create many new unique item
async function createItems(data) {
  return gachaItems.insertMany(data);
}

// update item quantity
async function changeQuantity(id, quantity) {
  return gachaItems.updateOne({ _id: id }, { $set: { quantity } });
}

async function getItem(id) {
  return gachaItems.findById(id);
}

async function deleteItem(id) {
  return gachaItems.deleteOne({ _id: id });
}

async function getLatestPeriode() {
  const periods = await gachaItems.find({}).sort({ periode: -1 }).limit(1);
  // if periods is empty, returns undefine
  return periods[0]?.periode;
}

async function getWinItems() {
  return gachaItems.find({ isWin: true });
}

// find all items by periode
async function getWinItemsByPeriod(periode) {
  return gachaItems.find({ periode, isWin: true });
}

// find all items by name
async function getWinItemsByName(name) {
  return gachaItems.find({ item: name, isWin: true });
}

module.exports = {
  getValidItems,
  getValidWinItems,
  getValidItemsByPeriod,
  getValidItemsByName,
  getValidWinItemsByPeriod,
  getItems,
  getItem,
  getItemsByPeriod,
  getItemsByName,
  getItemByPeriodnName,
  getWinItems,
  getWinItemsByPeriod,
  getWinItemsByName,
  getLatestPeriode,
  createItem,
  changeQuantity,
  deleteItem,
  createItems,
};
