const ClienteRepository = require('../domain/cliente.repository');
const Cliente = require('../domain/cliente.entity');
const pool = require('../../db.js');

class MySQLClienteRepository extends ClienteRepository {
    async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM clientes');
        return rows.map(row => new Cliente(
            row.id,
            row.identificacion,
            row.nombre,
            row.telefono,
            row.direccion,
            row.limite_credito
        ));
    }

    async guardar(cliente) {
        const [result] = await pool.query(
            'INSERT INTO clientes (identificacion, nombre, telefono, direccion, limite_credito) VALUES (?, ?, ?, ?, ?)',
            [cliente.identificacion, cliente.nombre, cliente.telefono, cliente.direccion, cliente.limiteCredito]
        );
        return new Cliente(
            result.insertId,
            cliente.identificacion,
            cliente.nombre,
            cliente.telefono,
            cliente.direccion,
            cliente.limiteCredito
        );
    }
}

module.exports = MySQLClienteRepository;