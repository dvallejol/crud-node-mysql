const express = require('express');

// Importamos las rutas desacopladas de cada módulo
const productoRoutes = require('./src/productos/infrastructure/producto.routes');
const clienteRoutes = require('./src/clientes/infrastructure/cliente.routes');
const facturaRoutes = require('./src/facturacion/infrastructure/factura.routes');
const carteraRoutes = require('./src/cartera/infrastructure/cartera.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Montamos las rutas de nuestros módulos (Hexágonos)
app.use('/productos', productoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/facturas', facturaRoutes);
app.use('/cartera', carteraRoutes);

// Encender el servidor solo si no estamos ejecutando pruebas de Jest
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo localmente en http://localhost:${PORT}`);
    });
}

// Exportamos solo 'app' para las pruebas con Supertest
module.exports = app;