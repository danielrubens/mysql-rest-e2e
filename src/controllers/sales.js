const services = require('../services/sales');
const { response } = require('../middlewares/dry');

const createSale = async (req, res) => {
  const sale = await services.createSale(req.body);
  response(res, sale, 'insert');
};

const getAll = async (_, res) => {
  const sales = await services.getAll();
  response(res, sales);
};

const getById = async (req, res) => {
  const sale = await services.getById(req.params.id);
  response(res, sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = await services.update(id, req.body);
  response(res, sale);
};

const deleted = async (req, res) => {
  const sale = await services.deleted(req.params.id);
  response(res, sale, 'delete');
};

module.exports = { createSale, getAll, getById, deleted, update };