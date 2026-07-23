const ProductoRepository = require('../domain/producto.repository');
const Producto = require('../domain/producto.entity');
const pool = require('../../db.js');

class MySQLProductoRepository extends ProductoRepository {
    async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM productos');
        return rows.map(row => new Producto(
            row.id,
            row.nombre,
            row.precio,
            row.stock ?? 0,
            row.lote ?? null,
            row.fecha_vencimiento ?? null
        ));
    }

    async guardar(producto) {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, stock, lote, fecha_vencimiento) VALUES (?, ?, ?, ?, ?)',
            [
                producto.nombre, 
                producto.precio, 
                producto.stock ?? 0, 
                producto.lote ?? null, 
                producto.fechaVencimiento ?? null
            ]
        );
        return new Producto(
            result.insertId,
            producto.nombre,
            producto.precio,
            producto.stock ?? 0,
            producto.lote ?? null,
            producto.fechaVencimiento ?? null
        );
    }
}

module.exports = MySQLProductoRepository;