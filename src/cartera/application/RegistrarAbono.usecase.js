class RegistrarAbonoUseCase {
    constructor(carteraRepository) {
        this.carteraRepository = carteraRepository;
    }

    async ejecutar({ carteraId, monto }) {
        const montoNum = parseFloat(monto);

        if (!montoNum || montoNum <= 0) {
            throw new Error("El monto del abono debe ser mayor a 0.");
        }

        const cuenta = await this.carteraRepository.buscarPorId(carteraId);
        if (!cuenta) {
            throw new Error("La cuenta por cobrar no existe.");
        }

        const saldoRestanteNum = parseFloat(cuenta.saldoRestante);

        if (cuenta.estado === 'pagada' || saldoRestanteNum <= 0) {
            throw new Error("Esta cuenta ya se encuentra totalmente pagada.");
        }

        if (montoNum > saldoRestanteNum) {
            throw new Error(`El abono ($${montoNum}) no puede ser mayor al saldo restante ($${saldoRestanteNum}).`);
        }

        const nuevoSaldo = Number((saldoRestanteNum - montoNum).toFixed(2));
        const nuevoEstado = nuevoSaldo === 0 ? 'pagada' : 'pendiente';

        return await this.carteraRepository.registrarAbono(carteraId, montoNum, nuevoSaldo, nuevoEstado);
    }
}

module.exports = RegistrarAbonoUseCase;