const services = require('../services/products');
const { response } = require('../middlewares/dry');

const getAll = async (_, res) => {
  const products = await services.getAll();
  response(res, products);
};

const getById = async (req, res) => {
  const product = await services.getById(req.params.id);
  response(res, product);
};

const insert = async (req, res) => {
  const product = await services.insert(req.body.name);
  response(res, product, 'insert');
};

const update = async (req, res) => {
  const [{ id }, { name }] = [req.params, req.body];
  const product = await services.update(id, name);
  response(res, product);
};

const deleted = async (req, res) => {
  const product = await services.deleted(req.params.id);
  response(res, product, 'delete');
};

const search = async (req, res) => {
  const { q: query } = req.query;
  const products = await services.getAll();
  const found = products.filter((i) => i.name.includes(query));
  response(res, found);
};

module.exports = { getAll, getById, insert, update, deleted, search };