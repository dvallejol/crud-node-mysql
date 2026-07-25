class ObtenerCarteraClienteUseCase {
    constructor(carteraRepository) {
        this.carteraRepository = carteraRepository;
    }

    async ejecutar(clienteId) {
        return await this.carteraRepository.obtenerPorCliente(clienteId);
    }
}

module.exports = ObtenerCarteraClienteUseCase;