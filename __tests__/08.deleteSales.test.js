const { runSeed, connect } = require('./_utils')
const frisby = require("frisby")
require("dotenv").config()

describe("Endpoint to delete sales", async () => {
    const url = `http:${process.env.HOST}:${process.env.PORT}`

    beforeAll(async () => await runSeed())
    afterAll(async () => await connect().end())

    it("Can't delete an unexistent product", async () => {
        const { status, json } = await frisby.delete(`${url}/sales/100`)

        expect(status).toBe(404)
        expect(json.message).toEqual("Sale not found")
    })

    it("Ensures an existent product is delete successfully", async () => {
        const { status } = await frisby.delete(`${url}/sales/1`)

        expect(status).toBe(204)
    })

    it("Ensures sales was deleted from database", async () => {
        const { status, json } = await frisby.get(`${url}/sales/1`)

        expect(status).toBe(404)
        expect(json.message).toEqual("Sale not found") 
    })
})