const CarteraRepository = require('../domain/cartera.repository');
const Cartera = require('../domain/cartera.entity');
const pool = require('../../db.js');

class MySQLCarteraRepository extends CarteraRepository {
    async obtenerPorCliente(clienteId) {
        const [rows] = await pool.query(
            'SELECT * FROM cartera WHERE cliente_id = ? ORDER BY id DESC',
            [clienteId]
        );
        return rows.map(r => new Cartera(r.id, r.factura_id, r.cliente_id, r.frecuencia_pago, r.monto_total, r.saldo_restante, r.estado));
    }

    async buscarPorId(id) {
        const [rows] = await pool.query('SELECT * FROM cartera WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        const r = rows[0];
        return new Cartera(r.id, r.factura_id, r.cliente_id, r.frecuencia_pago, r.monto_total, r.saldo_restante, r.estado);
    }

    async registrarAbono(carteraId, monto, nuevoSaldo, nuevoEstado) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 1. Insertar usando la columna exacta 'monto_abonado' de tu tabla
            await connection.query(
                'INSERT INTO abonos (cartera_id, monto_abonado) VALUES (?, ?)',
                [carteraId, monto]
            );

            // 2. Actualizar el saldo y estado en la cartera
            await connection.query(
                'UPDATE cartera SET saldo_restante = ?, estado = ? WHERE id = ?',
                [nuevoSaldo, nuevoEstado, carteraId]
            );

            await connection.commit();
            return { carteraId, abono: monto, saldoRestante: nuevoSaldo, estado: nuevoEstado };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = MySQLCarteraRepository;