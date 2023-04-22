const { runSeed, connect } = require('./_utils')
const frisby = require("frisby")
require("dotenv").config()

describe("Endpoint to delete products", async () => {
    const url = `http:${process.env.HOST}:${process.env.PORT}`

    beforeAll(async () => await runSeed())
    afterAll(async () => await connect().end())

    it("Can't delete an unexistent product", async () => {
        const { status, json } = await frisby.delete(`${url}/products/100`)

        expect(status).toBe(404)
        expect(json.message).toEqual("Product not found")
    })

    it("Ensures an existent product is delete successfully", async () => {
        const { status } = await frisby.delete(`${url}/products/1`)

        expect(status).toBe(204)
    })

    it("Ensures products was deleted from database", async () => {
        const { status, json } = await frisby.get(`${url}/products/1`)

        expect(status).toBe(404)
        expect(json.message).toEqual("Product not found") 
    })
})