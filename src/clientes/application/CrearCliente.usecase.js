class CrearClienteUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async ejecutar(datosCliente) {
        // Aquí podríamos validar reglas de negocio (ej: cédula válida)
        return await this.clienteRepository.guardar(datosCliente);
    }
}

module.exports = CrearClienteUseCase;