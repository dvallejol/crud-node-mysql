const express = require('express');
const router = express.Router();

const MySQLCarteraRepository = require('./mysql-cartera.repository');
const ObtenerCarteraClienteUseCase = require('../application/ObtenerCarteraCliente.usecase');
const RegistrarAbonoUseCase = require('../application/RegistrarAbono.usecase');
const CarteraController = require('./cartera.controller');

const carteraRepository = new MySQLCarteraRepository();
const obtenerCarteraClienteUseCase = new ObtenerCarteraClienteUseCase(carteraRepository);
const registrarAbonoUseCase = new RegistrarAbonoUseCase(carteraRepository);

const carteraController = new CarteraController(obtenerCarteraClienteUseCase, registrarAbonoUseCase);

router.get('/cliente/:clienteId', (req, res) => carteraController.obtenerPorCliente(req, res));
router.post('/abonos', (req, res) => carteraController.abonar(req, res));
module.exports = router;