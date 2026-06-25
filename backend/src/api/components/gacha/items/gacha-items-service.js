/* eslint-disable no-bitwise */
const gachaItemsRepository = require('./gacha-items-repository');

async function getQItems(Valid, Periode, Win, Name) {
  let bit = (Valid !== undefined && Valid !== false) << 1;
  bit = (bit | (Win !== undefined && Win !== false)) << 1;
  bit = (bit | (Periode !== undefined)) << 1;
  bit |= Name !== undefined;

  let promises;
  // eslint-disable-next-line default-case
  switch (bit) {
    // all false
    case 0b0000: {
      promises = gachaItemsRepository.getItems();
      break;
    }
    // get valid items
    case 0b1000: {
      promises = gachaItemsRepository.getValidItems();
      break;
    }
    // get items by name
    case 0b0001: {
      promises = gachaItemsRepository.getItemsByName(Name);
      break;
    }
    // get periode items
    case 0b0010: {
      promises = gachaItemsRepository.getItemsByPeriod(Periode);
      break;
    }
    // get items by name & periode
    case 0b0011: {
      promises = gachaItemsRepository.getItemByPeriodnName(Periode, Name);
      break;
    }
    // get win items
    case 0b0100: {
      promises = gachaItemsRepository.getWinItems();
      break;
    }
    // get win items by name
    case 0b0101: {
      promises = gachaItemsRepository.getWinItemsByName(Name);
      break;
    }
    // get win items by periode
    case 0b0110: {
      promises = gachaItemsRepository.getWinItemsByPeriod(Periode);
      break;
    }
    // get win items by periode and name
    case 0b0111: {
      const item = await gachaItemsRepository.getItemByPeriodnName(
        Periode,
        Name
      );
      promises = Promise.resolve(!item || !item.isWin ? [] : item);
      break;
    }
    // get valid items by name
    case 0b1001: {
      promises = gachaItemsRepository.getValidItemsByName(Name);
      break;
    }
    // get valid items by periode
    case 0b1010: {
      promises = gachaItemsRepository.getValidItemsByPeriod(Periode);
      break;
    }
    // get valid item by periode and name
    case 0b1011: {
      const item = await gachaItemsRepository.getItemByPeriodnName(
        Periode,
        Name
      );
      promises = Promise.resolve(!item || !(item.quantity > 0) ? [] : item);
      break;
    }
    // get valid win item
    case 0b1100: {
      const item = await gachaItemsRepository.getWinItems();
      promises = Promise.resolve(item.filters((i) => i.quantity > 0));
      break;
    }

    // get valid win item By Name
    case 0b1101: {
      const item = await gachaItemsRepository.getWinItemsByName(Name);
      promises = Promise.resolve(item.filters((i) => i.quantity > 0));
      break;
    }

    // get valid win item By Periode
    case 0b1110: {
      const item = await gachaItemsRepository.getWinItemsByPeriode(Periode);
      promises = Promise.resolve(item.filters((i) => i.quantity > 0));
      break;
    }

    // get valid win item by periode & name
    case 0b1111: {
      const item = await gachaItemsRepository.getItemByPeriodnName(
        Periode,
        Name
      );
      const filters = item && item.isWin && item.quantity > 0;
      promises = Promise.resolve(!filters ? [] : item);
      break;
    }
    default: {
      promises = [];
    }
  }
  return promises;
}

async function itemExists(periode, name) {
  const user = await gachaItemsRepository.getItemByPeriodnName(periode, name);
  return !!user; // Return true if item exists, false otherwise
}

async function createItem(periode, item, quantity, isWin) {
  // eslint-disable-next-line no-param-reassign
  isWin = isWin === undefined ? true : isWin;
  return gachaItemsRepository.createItem(periode, item, quantity, isWin);
}

// delete Items
async function deleteItem(id) {
  return gachaItemsRepository.deleteItem(id);
}

// get items by id
async function getItem(id) {
  return gachaItemsRepository.getItem(id);
}

async function getLatestPeriode() {
  return gachaItemsRepository.getLatestPeriode();
}

async function createItems(data) {
  return gachaItemsRepository.createItems(data);
}

async function chageQuantity(id, quantity) {
  return gachaItemsRepository.changeQuantity(id, quantity);
}

module.exports = {
  itemExists,
  createItem,
  createItems,
  deleteItem,
  getLatestPeriode,
  getQItems,
  getItem,
  chageQuantity,
};
