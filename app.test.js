const request = require('supertest');
const app = require('./app'); 
const pool = require('./src/db.js');

describe('Pruebas Locales del CRUD - Arquitectura Hexagonal', () => {
    
    afterAll(async () => {
        await pool.end(); // Cierra las conexiones activas para que Jest termine limpio
    });

    it('1. Debería responder con estado 200 al pedir los productos', async () => {
        const respuesta = await request(app).get('/productos');
        
        if (respuesta.statusCode !== 200) {
            console.error("Detalle del error en productos:", respuesta.body);
        }
        
        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });

    it('2. Debería crear una nueva factura a crédito y generar la cuenta en cartera', async () => {
        // Garantizamos cliente id:1 y producto id:1 en la BD
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

        if (respuesta.statusCode !== 201) {
            console.error("Detalle del error al crear factura:", respuesta.body);
        }

        expect(respuesta.statusCode).toBe(201);
        expect(respuesta.body).toHaveProperty('consecutivo');
        expect(respuesta.body.total).toBe(30.00);
    });

    it('3. Debería consultar la cartera del cliente y registrar un abono exitosamente', async () => {
        // Consultar cuentas por cobrar del cliente ID 1
        const respuestaCartera = await request(app).get('/cartera/cliente/1');
        
        if (respuestaCartera.statusCode !== 200) {
            console.error("Detalle del error al consultar cartera:", respuestaCartera.body);
        }

        expect(respuestaCartera.statusCode).toBe(200);
        expect(Array.isArray(respuestaCartera.body)).toBe(true);
        expect(respuestaCartera.body.length).toBeGreaterThan(0);

        const cuentaPorCobrar = respuestaCartera.body[0];

        // Registrar un abono de $10.00 a la cuenta
        const payloadAbono = {
            carteraId: cuentaPorCobrar.id,
            monto: 10.00
        };

        const respuestaAbono = await request(app)
            .post('/cartera/abonos')
            .send(payloadAbono);

        if (respuestaAbono.statusCode !== 200) {
            console.error("Detalle del error al abonar:", respuestaAbono.body);
        }

        expect(respuestaAbono.statusCode).toBe(200);
        expect(respuestaAbono.body.abono).toBe(10.00);
        expect(respuestaAbono.body.saldoRestante).toBe(cuentaPorCobrar.saldoRestante - 10.00);
    });
});