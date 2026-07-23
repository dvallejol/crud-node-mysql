class ObtenerProductosUseCase {
    // Le pasamos el repositorio por el constructor (Inyección de Dependencias)
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }

    async ejecutar() {
        // El caso de uso llama al puerto, sin saber qué base de datos hay detrás
        return await this.productoRepository.obtenerTodos();
    }
}

module.exports = ObtenerProductosUseCase;