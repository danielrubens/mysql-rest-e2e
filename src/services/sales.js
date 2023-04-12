const model = require('../models/sales');
const { toController } = require('../middlewares/dry');
const { validate } = require('../middlewares/validateSales');

const createSale = async (body) => {
  const validated = await validate(body);
  if (validated) return validated;
  const { id } = await model.createId();
  Promise.all(body.map(async (i) => { await model.createSale(id, i); }));
  return { id, itemsSold: body };
};

const getAll = async () => {
  const sales = await model.getAll();
  return toController(sales);
};

const getById = async (id) => {
  const sale = await model.getById(id);
  return toController(sale, 'Sale');
};

const update = async (id, body) => {
  const validated = await validate(body);
  if (validated) return validated;
  Promise.all(body.map(async (i) => { await model.update(id, i); }));
  const sale = await model.getById(id);
  if (!sale) return toController(sale, 'Sale');
  return { saleId: id, itemsUpdated: body };
};

const deleted = async (id) => {
  const sale = await model.deleted(id);
  return toController(sale, 'Sale');
};

module.exports = { createSale, getAll, getById, deleted, update };