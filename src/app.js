const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/search', controller.products.search);
app.get('/products', controller.products.getAll);
app.get('/products/:id', controller.products.getById);
app.get('/sales', controller.sales.getAll);
app.get('/sales/:id', controller.sales.getById);
app.post('/products', controller.products.insert);
app.put('/products/:id', controller.products.update);
app.delete('/products/:id', controller.products.deleted);
app.delete('/sales/:id', controller.sales.deleted);
app.put('/sales/:id', controller.sales.update);
app.post('/sales', controller.sales.createSale);

module.exports = app;