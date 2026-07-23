const request = require('supertest');
const app = require('./app'); 
const pool = require('./src/db.js');

describe('Pruebas Locales del CRUD', () => {
    
    afterAll(async () => {
        await pool.end(); // Cierra las conexiones activas para que Jest finalice limpio
    });

    it('Debería responder con un estado 200 al pedir los productos', async () => {
        const respuesta = await request(app).get('/productos');
        
        if (respuesta.statusCode !== 200) {
            console.error("Detalle del error en productos:", respuesta.body);
        }
        
        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });

    it('Debería crear una nueva factura exitosamente', async () => {
        // Aseguramos existencia del cliente ID 1 y producto ID 1 en la BD
        await pool.query("INSERT IGNORE INTO clientes (id, identificacion, nombre) VALUES (1, '123456789', 'Cliente Test')");
        await pool.query("INSERT IGNORE INTO productos (id, nombre, precio, stock) VALUES (1, 'Producto Test', 15.00, 100)");

        const payloadFactura = {
            clienteId: 1,
            tipoPago: 'credito',
            frecuenciaPago: 'quincenal',
            items: [
                { productoId: 1, cantidad: 2, precioUnitario: 15.00 }
            ]
        };

        const respuesta = await request(app)
            .post('/facturas')
            .send(payloadFactura);

        // Si no da 201, imprimimos la respuesta completa del backend
        if (respuesta.statusCode !== 201) {
            console.error("Detalle del error al crear factura:", respuesta.body);
        }

        expect(respuesta.statusCode).toBe(201);
        expect(respuesta.body).toHaveProperty('consecutivo');
        expect(respuesta.body.total).toBe(30.00);
    });
});