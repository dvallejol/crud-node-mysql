class ProductoRepository {
    async obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' debe ser implementado.");
    }

    async guardar(producto) {
        throw new Error("Método 'guardar()' debe ser implementado.");
    }
}

module.exports = ProductoRepository;




