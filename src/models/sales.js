const connection = require('./connection');

const createId = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [sale] = await connection.query(query);
  return { id: sale.insertId };
};

const createSale = async (id, { productId, quantity }) => {
  const query = `INSERT INTO StoreManager.sales_products 
                (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  await connection.query(query, [id, productId, quantity]);
};

const getAll = async () => {
  const query = `SELECT sale_id as saleId, date, product_id as productId, quantity 
                 FROM StoreManager.sales_products
                 INNER JOIN StoreManager.sales ON sale_id = id ORDER BY sale_id, product_id`;
  const [sales] = await connection.query(query);
  return sales;
};

const getById = async (id) => {
  const query = `SELECT date, product_id as productId, quantity FROM StoreManager.sales_products
                 INNER JOIN StoreManager.sales ON sale_id = id WHERE sale_id = ?`;
  const [sale] = await connection.query(query, [id]);
  if (!sale || sale.length === 0) return null;
  return sale;
};

const update = async (id, { productId, quantity }) => {
  const query = `UPDATE StoreManager.sales_products INNER JOIN StoreManager.sales
                 ON sale_id = id SET quantity = ? WHERE id = ? AND product_id = ?`;
  await connection.query(query, [quantity, id, productId]);
  return { saleId: id };
};

const deleted = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const [sale] = await connection.query(query, [id]);
  if (!sale || sale.length === 0) return null;
  await connection.query('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return sale;
};

module.exports = { createId, createSale, getAll, getById, deleted, update };