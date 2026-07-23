class ObtenerClientesUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async ejecutar() {
        return await this.clienteRepository.obtenerTodos();
    }
}

module.exports = ObtenerClientesUseCase;