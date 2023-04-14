require('dotenv').config();
const frisby = require('frisby');
const { runSeed, connect } = require('./_utils');


describe("Get all sales at /sales endpoint", () => {
    
    const url = `http://${process.env.HOST}:${process.env.PORT}`;

    beforeAll(async() => await runSeed());
    afterAll(async () => await connect().end());

    it("Can access /sales endpoint", async () => {
        const { status } = await frisby.get(`${url}/sales`);
        expect(status).toBe(200)
    })

    it("Can list sales", async () => {
        const { status, json } = await frisby.get(`${url}/sales`);
        expect(status).toBe(200);
        expect(json.length).toBe(3);
        
        const properties = ["saleId", "productId", "quantity", "date"];
        properties.forEach((property) => {
            json.forEach((_, index) => {
                expect(json[index]).toHaveProperty(property);
            })
        })
    })
})