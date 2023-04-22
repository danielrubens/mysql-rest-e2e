const { runSeed, connect } = require('./_utils')
const frisby = require("frisby")
const products = require('./results/products.json')
require("dotenv").config()

describe("Endpoint to update products", () => {
    const url = `http://${process.env.HOST}:${process.env.PORT}`

    beforeAll(async () => await runSeed())
    afterAll(async () => await connect().end())

    it("Can't update a product without name field", async () => {
        const { status, json } = await frisby.put(`${url}/products/1`, products["invalid"]["body"])

        expect(status).toBe(400)
        expect(json.message).toEqual("\"name\" is required")
    })

    it("Product name must to be at least 5 characters long", async () => {
        const { status, json } = await frisby.put(`${url}/products/1`, products["invalid"]["size"])

        expect(status).toBe(422)
        expect(json.message).toEqual("\"name\" length must be at least 5 characters long")
    })

    it("Can't update an unexistent product", async () => {
        const { status, json } = await frisby.put(`${url}/products/100`, products["update"])

        expect(status).toBe(404)
        expect(json.message).toEqual("Product not found")
    })

    it("Updates an existent product with the right body", async () => {
        const { status, json } = await frisby.put(`${url}/products/1`, products["update"])

        expect(status).toBe(200)
        expect(json).toHaveProperty("id")
        expect(json).toHaveProperty("name")
        expect(json.name).toBeDefined()
        expect(json.name).toEqual("Machado do Thor Stormbreaker")
    })

    it("Ensures product was updated", async () => {
        const { status, json } = await frisby.get(`${url}/products/1`)

        expect(status).toBe(200)
        expect(json.name).toEqual("Machado do Thor Stormbreaker")
    })

})