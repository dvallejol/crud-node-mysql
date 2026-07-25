class CarteraRepository {
    async obtenerPorCliente(clienteId) {
        throw new Error("Método 'obtenerPorCliente()' no implementado");
    }

    async buscarPorId(id) {
        throw new Error("Método 'buscarPorId()' no implementado");
    }

    async registrarAbono(carteraId, monto, nuevoSaldo, nuevoEstado) {
        throw new Error("Método 'registrarAbono()' no implementado");
    }
}

module.exports = CarteraRepository;