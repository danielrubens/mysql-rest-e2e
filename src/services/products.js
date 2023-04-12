const model = require('../models/products');
const { toController } = require('../middlewares/dry');

const getAll = async () => {
  const products = await model.getAll();
  return toController(products, 'Product');
};

const getById = async (id) => {
  const product = await model.getById(id);
  return toController(product, 'Product');
};

const insert = async (arg) => {
  if (!arg) return { error: { code: 400, message: '"name" is required' } };
  if (arg.length < 5) {
    return { error: { code: 422, message: '"name" length must be at least 5 characters long' } };
  }
  const product = await model.insert(arg);
  return toController(product);
};

const update = async (id, name) => {
  if (!name) return { error: { code: 400, message: '"name" is required' } };
  if (name.length < 5) {
    return { error: { code: 422, message: '"name" length must be at least 5 characters long' } };
  }
  const product = await model.update(id, name);
  return toController(product, 'Product');
};

const deleted = async (id) => {
  const product = await model.deleted(id);
  return toController(product, 'Product');
};

module.exports = { getAll, getById, insert, update, deleted };