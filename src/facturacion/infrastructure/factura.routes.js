const express = require('express');
const router = express.Router();

const MySQLFacturaRepository = require('./mysql-factura.repository');
const CrearFacturaUseCase = require('../application/CrearFactura.usecase');
const FacturaController = require('./factura.controller');

const facturaRepository = new MySQLFacturaRepository();
const crearFacturaUseCase = new CrearFacturaUseCase(facturaRepository);
const facturaController = new FacturaController(crearFacturaUseCase);

router.post('/', (req, res) => facturaController.crear(req, res));

module.exports = router;