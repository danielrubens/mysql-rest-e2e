const models = require('../models/products');

const quantity = (arg) => {
  if (arg < 1) {
    return { error: { code: 422, message: '"quantity" must be greater than or equal to 1' } };
  }
  if (!arg) return { error: { code: 400, message: '"quantity" is required' } };
  return {};
};

const product = (arg) => {
  if (!arg) return { error: { code: 400, message: '"productId" is required' } };
  return {};
};

const absence = async (id) => {
  const el = await models.getById(id);
  if (!el) return { error: { code: 404, message: 'Product not found' } };
  return {};
};

const validate = async (arg) => Promise.all(arg.map(async (i) => {
  if (quantity(i.quantity).error) return quantity(i.quantity);
  if (product(i.productId).error) return product(i.productId);
  const lack = await absence(i.productId);
  if (lack.error) return lack;
})).then((response) => response.find((data) => data));

module.exports = { validate };