class DetalleFactura {
    constructor(id, facturaId, productoId, cantidad, precioUnitario, subtotal) {
        this.id = id;
        this.facturaId = facturaId;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }
}

module.exports = DetalleFactura;