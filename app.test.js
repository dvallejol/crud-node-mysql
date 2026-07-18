const request = require('supertest');
const { app, pool } = require('./app'); 

describe('Pruebas Locales del CRUD', () => {
    
    afterAll(async () => {
        await pool.end();
    });

    it('Debería responder con un estado 200 al pedir los productos', async () => {
        const respuesta = await request(app).get('/productos');
        
        // Si falla en la nube, esto nos dirá exactamente por qué Express lanzó un 500
        if (respuesta.statusCode !== 200) {
            console.error("Detalle del error en el servidor:", respuesta.text);
        }
        
        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});