class Cartera {
    constructor(id, facturaId, clienteId, frecuenciaPago, montoTotal, saldoRestante, estado = 'pendiente') {
        this.id = id;
        this.facturaId = facturaId;
        this.clienteId = clienteId;
        this.frecuenciaPago = frecuenciaPago;
        this.montoTotal = montoTotal;
        this.saldoRestante = saldoRestante;
        this.estado = estado; // 'pendiente' o 'pagada'
    }
}

module.exports = Cartera;