const gachaItemsService = require('./gacha-items-service');
const { errorResponder, errorTypes } = require('../../../../core/errors');

// mengambil semua items di database
async function getItems(request, response, next) {
  try {
    const { periode } = request.query;
    let users;
    if (!periode) {
      users = await gachaItemsService.getQItems(
        undefined,
        undefined,
        undefined,
        undefined
      );
    } else {
      users = await gachaItemsService.getQItems(
        undefined,
        periode,
        undefined,
        undefined
      );
    }

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

// mengambil satu item di database
async function getItem(request, response, next) {
  try {
    const { id } = request.params;

    // we dont have to validate id, because if id is blank,
    // then we will call getItems on the routes
    const success = await gachaItemsService.getItem(id);
    if (!success) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Item not found');
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

// mengambil hanya valid items di database
async function getValidItems(request, response, next) {
  try {
    const { periode } = request.query;
    let users;
    if (!periode) {
      users = await gachaItemsService.getQItems(
        true,
        undefined,
        undefined,
        undefined
      );
    } else {
      users = await gachaItemsService.getQItems(
        true,
        periode,
        undefined,
        undefined
      );
    }

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

// membuat items di dalam database
async function createItems(request, response, next) {
  try {
    // jika request itu array
    // membuat response menjadi array
    const items = Array.isArray(request.body) ? request.body : [request.body];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const it of items) {
      const { periode, name: item, quantity } = it;

      if (periode === undefined) {
        throw errorResponder(errorTypes.VALIDATION_ERROR, 'Period is required');
      }

      // jika nama tidak ada
      if (!item) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Item Name is required'
        );
      }

      // jika banyak tidak ada
      if (quantity === undefined) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Quantity is required'
        );
      }

      // jika periode negatif
      if (periode < 1) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Period is required to be positive'
        );
      }

      // jika banyak negatif
      if (quantity < 0) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Quantity is required to be more than zero'
        );
      }

      // if item in the db
      // eslint-disable-next-line no-await-in-loop
      const exist = await gachaItemsService.itemExists(periode, item);
      if (exist) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          `Item ${item} is in the db`
        );
      }
    }

    // change name to item
    const newItems = items.map(({ name: item, periode, quantity, isWin }) => ({
      item,
      periode,
      quantity,
      isWin,
    }));

    // if the above code runs, then the input isnt error
    const success = await gachaItemsService.createItems(newItems);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create item'
      );
    }

    return response.status(200).json({ message: 'Item created successfully' });
  } catch (error) {
    return next(error);
  }
}

// mendelete item
async function deleteItem(request, response, next) {
  try {
    const { id } = request.params;
    if (!id) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Id is required');
    }

    const item = await gachaItemsService.getItem(id);
    if (!item) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Item not found');
    }

    const success = await gachaItemsService.deleteItem(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete item'
      );
    }

    return response.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createItems, getValidItems, getItems, deleteItem, getItem };
