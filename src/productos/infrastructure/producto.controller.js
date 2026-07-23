class ProductoController {
    constructor(obtenerProductosUseCase) {
        this.obtenerProductosUseCase = obtenerProductosUseCase;
    }

    async obtenerTodos(req, res) {
        try {
            const productos = await this.obtenerProductosUseCase.ejecutar();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductoController;