// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


// Ruta para autenticacion de un usuario
router.post('/login', userController.login);

// Ruta para comprobar el estado del token del usuario
router.post('/check', userController.check);

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);

// Ruta para actualizar los datos de un usuario
router.post('/update-user', userController.update);

// Ruta para eliminar un usuario
router.post('/delete-user', userController.delete);


module.exports = router;
