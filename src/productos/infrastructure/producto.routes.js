const express = require('express');
const router = express.Router();

const MySQLProductoRepository = require('./mysql-producto.repository');
const ObtenerProductosUseCase = require('../application/ObtenerProductos.usecase');
const ProductoController = require('./producto.controller');

// Instanciamos el adaptador, le inyectamos al caso de uso y este al controlador
const productoRepository = new MySQLProductoRepository();
const obtenerProductosUseCase = new ObtenerProductosUseCase(productoRepository);
const productoController = new ProductoController(obtenerProductosUseCase);

router.get('/', (req, res) => productoController.obtenerTodos(req, res));

module.exports = router;