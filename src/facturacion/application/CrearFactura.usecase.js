class CrearFacturaUseCase {
    constructor(facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    async ejecutar({ clienteId, tipoPago, frecuenciaPago, items }) {
        if (!items || items.length === 0) {
            throw new Error("La factura debe contener al menos un producto.");
        }

        const consecutivo = await this.facturaRepository.obtenerSiguienteConsecutivo();

        let totalFactura = 0;
        const detallesProcesados = [];

        for (const item of items) {
            const subtotal = item.cantidad * item.precioUnitario;
            totalFactura += subtotal;

            detallesProcesados.push({
                productoId: item.productoId,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
                subtotal: subtotal
            });
        }

        const nuevaFactura = {
            consecutivo,
            clienteId,
            tipoPago,
            frecuenciaPago: frecuenciaPago || 'mensual', // 'semanal', 'quincenal', 'mensual'
            total: totalFactura,
            detalles: detallesProcesados
        };

        return await this.facturaRepository.crearFactura(nuevaFactura);
    }
}

module.exports = CrearFacturaUseCase;