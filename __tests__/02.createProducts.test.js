require('dotenv').config();
const frisby = require("frisby");
const { runSeed, connect } = require('./_utils');
const products = require('./results/products.json')

describe("Endpoint to create products", () => {

    const url = `http://${process.env.HOST}:${process.env.PORT}`;
    beforeAll(async () => await runSeed());
    afterAll(async () => await connect().end());

    it("It's possible to create a product", async () => {
        const created = products['create']['created']
        const response = products['create']['response']
        const { status, json } = await frisby.post(`${url}/products`, created)
        expect(status).toBe(201);
        expect(json).toEqual(response)
    })
})
