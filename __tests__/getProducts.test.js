const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const allProducts  = require('./results/products').getAll;
require("dotenv").config();


describe("01 - Create endpoint to list all products", () => {

  const url = `http://${process.env.HOST}:${process.env.PORT}`;
  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Exists route /products", async () => {
    const { status } = await frisby.get(`${url}/products`);

    expect(status).toBeLessThan(400);
  });

  it("List all products", async () => {
    const { status, json } = await frisby.get(`${url}/products`);

    expect(status).toBe(200);
    expect(json).toEqual(allProducts);
  });

  it("Impossible to list an unexistent product", async () => {
    const { status, json } = await frisby.get(`${url}/products/999`);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Can list a product with an specific id", async () => {
    const { status, json } = await frisby.get(`${url}/products/1`);

    expect(status).toBe(200);
    expect(json).toEqual(allProducts[0]);
  });
});