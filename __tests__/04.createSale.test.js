require('dotenv').config();
const frisby = require('frisby');
const { runSeed, connect } = require('./_utils');
const sales = require('./results/sales.json')

describe('Endpoint to create and validate sales', () => {
    const url = `http://${process.env.HOST}:${process.env.PORT}`;
    beforeAll(async () => await runSeed());
    afterAll(async () => await connect().end());
    const invalid = sales["invalid"]

    it("Can't post a sale withou productId", async () => {
        const { status, json } = await frisby.post(`${url}/sales`, invalid["noProductId"])
        expect(status).toBe(400);
        expect(json.message).toEqual("\"productId\" is required");
    })

    it("Quantity can't be zero", async () => {
        const { status, json } = await frisby.post(`${url}/sales`, invalid["zeroQuantity"])
        expect(status).toBe(422);
        expect(json.message).toEqual("\"quantity\" must be greater than or equal to 1")
    })

    it("Quantity can't be negative", async () => {
        const { status, json } = await frisby.post(`${url}/sales`, invalid["nonNegative"])
        expect(status).toBe(422);
        expect(json.message).toEqual("\"quantity\" must be greater than or equal to 1")
    })

    it("Can't create a sale of an unexistent productId", async () => {
        const { status, json } = await frisby.post(`${url}/sales`, invalid["unexistentProductId"])
        expect(status).toBe(404);
        expect(json.message).toEqual("Product not found")
    })

    it("Can't create a sale of an unexistent productId", async () => {
        const { status, json } = await frisby.post(`${url}/sales`, invalid["unexistentProductId2"])
        expect(status).toBe(404);
        expect(json.message).toEqual("Product not found")
    })

    it("Create a sale succesfully", async () => {
        const { status, json } = await frisby.post(`${url}/sales`, sales["OK"])
        const created = sales["created"]
        const query = ['SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [created["id"]]]
        const [response] = await connect().execute(...query)
        expect(status).toBe(201)
        expect(json).toEqual(created)
        expect(response.length).toEqual(2)
    })

})