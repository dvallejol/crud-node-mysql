const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Middleware para que Express entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// 1. Configuración del Pool de Conexiones a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',                  // Tu usuario de MySQL
    password: '', // ¡Recuerda cambiar esto por tu contraseña real!
    database: 'tienda_db',         // Tu base de datos local
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Ruta básica (GET) para listar los productos
app.get('/productos', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM productos');
        res.json(filas);
    } catch (error) {
        // Cambiamos esto para que nos devuelva el mensaje real del error
        res.status(500).send(error.message); 
    }
});

// 3. Encender el servidor local (solo si no estamos ejecutando pruebas)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo localmente en http://localhost:${PORT}`);
    });
}

// 4. Exportar para que el archivo 'app.test.js' pueda usarlo
module.exports = { app, pool };