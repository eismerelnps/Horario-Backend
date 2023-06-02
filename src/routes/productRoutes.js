// routes/productRoutes.js

const express = require('express');
const { createProductValidators } = require('../validators/productValidators');
const productController = require('../controllers/productController');
const middleware = require('../middleware/middleware');


const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/:id', middleware.authenticate, middleware.checkPermissions(['admin', 'superadmin']), productController.getProductById);

// Ruta para crear un nuevo producto
router.post('/', middleware.authenticate, middleware.checkPermissions(['create', 'read', 'update', 'delete']), createProductValidators, productController.createProduct);

// Ruta para actualizar un producto por su ID
router.put('/:id', middleware.checkPermissions(['update']), productController.updateProductById);

// Ruta para eliminar un producto por su ID
router.delete('/:id', middleware.checkPermissions(['delete']), productController.deleteProductById);

module.exports = router;
