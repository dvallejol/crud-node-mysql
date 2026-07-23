const FacturaRepository = require('../domain/factura.repository');
const pool = require('../../db.js');

class MySQLFacturaRepository extends FacturaRepository {
    async obtenerSiguienteConsecutivo() {
        const [rows] = await pool.query('SELECT COUNT(*) as total FROM facturas');
        const siguienteNumero = rows[0].total + 1;
        return `FACT-${String(siguienteNumero).padStart(4, '0')}`;
    }

    async crearFactura(facturaData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 1. Insertar encabezado de la factura
            const [resultFactura] = await connection.query(
                'INSERT INTO facturas (consecutivo, cliente_id, tipo_pago, total) VALUES (?, ?, ?, ?)',
                [facturaData.consecutivo, facturaData.clienteId, facturaData.tipoPago, facturaData.total]
            );
            const facturaId = resultFactura.insertId;

            // 2. Insertar los detalles y descontar stock de productos
            for (const item of facturaData.detalles) {
                await connection.query(
                    'INSERT INTO detalle_facturas (factura_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                    [facturaId, item.productoId, item.cantidad, item.precioUnitario, item.subtotal]
                );

                // Descontar inventario
                await connection.query(
                    'UPDATE productos SET stock = stock - ? WHERE id = ?',
                    [item.cantidad, item.productoId]
                );
            }

            // 3. Si es a crédito, registrar automáticamente la cuenta en cartera
            if (facturaData.tipoPago === 'credito') {
                await connection.query(
                    'INSERT INTO cartera (factura_id, cliente_id, frecuencia_pago, monto_total, saldo_restante) VALUES (?, ?, ?, ?, ?)',
                    [facturaId, facturaData.clienteId, facturaData.frecuenciaPago || 'mensual', facturaData.total, facturaData.total]
                );
            }

            await connection.commit();
            return { id: facturaId, ...facturaData };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = MySQLFacturaRepository;