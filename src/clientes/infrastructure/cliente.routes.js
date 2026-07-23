const express = require('express');
const router = express.Router();

const MySQLClienteRepository = require('./mysql-cliente.repository');
const ObtenerClientesUseCase = require('../application/ObtenerClientes.usecase');
const ClienteController = require('./cliente.controller');

const clienteRepository = new MySQLClienteRepository();
const obtenerClientesUseCase = new ObtenerClientesUseCase(clienteRepository);
const clienteController = new ClienteController(obtenerClientesUseCase);

router.get('/', (req, res) => clienteController.obtenerTodos(req, res));

module.exports = router;