const { runSeed, connect } = require('./_utils')
const frisby = require("frisby")
require("dotenv").config()

const testDeleteEndpoints = (route, element) => {
    describe("Endpoint to delete elements", async () => {
        const url = `http:${process.env.HOST}:${process.env.PORT}`
    
        beforeAll(async () => await runSeed())
        afterAll(async () => await connect().end())
    
        it(`Can't delete an nonexistent  element`, async () => {
            const { status, json } = await frisby.delete(`${url}/${route}/100`)
    
            expect(status).toBe(404)
            expect(json.message).toEqual(`${element} not found`)
        })
    
        it(`Ensures an existing element is deleted successfully`, async () => {
            const { status } = await frisby.delete(`${url}/${route}/1`)
    
            expect(status).toBe(204)
        })
    
        it(`Ensures the element was deleted from database`, async () => {
            const { status, json } = await frisby.get(`${url}/${route}/1`)
    
            expect(status).toBe(404)
            expect(json.message).toEqual(`${element} not found`) 
        })
    })
}

testDeleteEndpoints('sales', 'Sale')
testDeleteEndpoints('products', 'Product')
