// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware');

const router = express.Router();


// Ruta para autenticacion de un usuario
router.post('/login', userController.login);

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);


// Ruta para comprobar el estado del token del usuario
router.post('/check', middleware.authenticate, userController.check);

// Ruta para actualizar los datos de un usuario
router.put('/update-user', middleware.authenticate, userController.update);

// Ruta para eliminar un usuario
router.delete('/delete-user', middleware.authenticate, userController.delete);


module.exports = router;
