// routes/productRoutes.js

const express = require('express');
//const { createHourValidators } = require('../validators/productValidators');
const hourController = require('../controllers/hourController');
//const middleware = require('../middleware/middleware');


const router = express.Router();

// Ruta para obtener todos los horario
router.get('/', hourController.getAllHours);

// Ruta para obtener un horario por su ID
router.get('/:id', hourController.getHourById);




 // Ruta para crear un nuevo producto
//router.post('/', middleware.authenticate, middleware.checkPermissions(['create', 'read', 'update', 'delete']), createHourValidators, hourController.createProduct);

 // Ruta para actualizar un producto por su ID
// router.put('/:id', middleware.checkPermissions(['update']), productController.updateProductById);

// Ruta para eliminar un producto por su ID
// router.delete('/:id', middleware.checkPermissions(['delete']), productController.deleteProductById);

module.exports = router;
