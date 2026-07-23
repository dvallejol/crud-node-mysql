class Factura {
    constructor(id, consecutivo, clienteId, fechaEmision, tipoPago, total, detalles = []) {
        this.id = id;
        this.consecutivo = consecutivo; // Ej: FACT-0001
        this.clienteId = clienteId;
        this.fechaEmision = fechaEmision;
        this.tipoPago = tipoPago; // 'contado' o 'credito'
        this.total = total;
        this.detalles = detalles; // Arreglo de Ítems
    }
}

module.exports = Factura;