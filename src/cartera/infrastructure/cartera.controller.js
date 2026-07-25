class CarteraController {
    constructor(obtenerCarteraClienteUseCase, registrarAbonoUseCase) {
        this.obtenerCarteraClienteUseCase = obtenerCarteraClienteUseCase;
        this.registrarAbonoUseCase = registrarAbonoUseCase;
    }

    async obtenerPorCliente(req, res) {
        try {
            const { clienteId } = req.params;
            const cartera = await this.obtenerCarteraClienteUseCase.ejecutar(clienteId);
            res.status(200).json(cartera);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async abonar(req, res) {
        try {
            const resultado = await this.registrarAbonoUseCase.ejecutar(req.body);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CarteraController;