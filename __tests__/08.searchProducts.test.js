const { runSeed, connect } = require('./_utils')
const frisby = require('frisby')
const products = require('./results/products.json')
require('dotenv').config()

describe("Endpoint to search products", () => {
    const url = `http://${process.env.HOST}:${process.env.PORT}`

    beforeAll(async () => await runSeed())
    afterAll(async () => connect().end())

    it('Can search an element by name', async () => {
        const { status, json } = await frisby.get(`${url}/products/search?q=Martelo`)

        expect(status).toBe(200)
        expect(json).toEqual(products["search"])
    })

    it('Retrieves all elements with an empty query', async () => {
        const { status, json } = await frisby.get(`${url}/products/search?q=`)

        expect(status).toBe(200)
        expect(json).toEqual(products["getAll"])
    })
})