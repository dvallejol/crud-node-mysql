class FacturaController {
    constructor(crearFacturaUseCase) {
        this.crearFacturaUseCase = crearFacturaUseCase;
    }

    async crear(req, res) {
        try {
            const facturaCreada = await this.crearFacturaUseCase.ejecutar(req.body);
            res.status(201).json(facturaCreada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = FacturaController;