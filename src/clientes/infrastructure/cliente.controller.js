class ClienteController {
    constructor(obtenerClientesUseCase) {
        this.obtenerClientesUseCase = obtenerClientesUseCase;
    }

    async obtenerTodos(req, res) {
        try {
            const clientes = await this.obtenerClientesUseCase.ejecutar();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ClienteController;