const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.query(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.query(query, [id]);
  return product;
};

const insert = async (arg) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.query(query, [arg]);
  return { id: product.insertId, name: arg };
};

const update = async (id, name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.query(query, [id]);
  if (!product || product.length === 0) return null;
  const setting = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.query(setting, [name, id]);
  return { id, name };
};

const deleted = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.query(query, [id]);
  if (!product || product.length === 0) return null;
  await connection.query('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return product;
};

module.exports = { getAll, getById, insert, update, deleted };