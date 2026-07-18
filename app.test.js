const request = require('supertest');
const { app, pool } = require('./app'); 

describe('Pruebas Locales del CRUD', () => {
    
    afterAll(async () => {
        await pool.end();
    });

    it('Debería responder con un estado 200 al pedir los productos', async () => {
        const respuesta = await request(app).get('/productos');
        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});