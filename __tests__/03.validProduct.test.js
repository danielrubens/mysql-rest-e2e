const frisby = require('frisby');
const invalid = require('./results/products.json')["invalid"]
require('dotenv').config();

jest.mock('mysql2/promise', () => {
    const connectionError = new Error("No need to connect to DB");
    const mock = jest.fn().mockImplementation(() => ({
        execute: jest.fn().mockRejectedValue(connectionError),
        query: jest.fn().mockRejectedValue(connectionError)
    }))
    return { createPool: mock, createConnection: mock, createPoolCluster: mock };
})

describe("Product has valid format", () => {
    const url = `http://${process.env.HOST}:${process.env.PORT}`;

    it("Not possible create a product without the name field", async () => {
        const { status, json } = await frisby.post(`${url}/products`, invalid["body"])
        expect(status).toBe(400);
        expect(json.message).toEqual("\"name\" is required")
    })

    it("Product name has at least 5 characters", async () => {
        const { status, json } = await frisby.post(`${url}/products`, invalid["size"])
        expect(status).toBe(422);
        expect(json.message).toEqual("\"name\" length must be at least 5 characters long")
    })
})