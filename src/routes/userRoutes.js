// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);

// Ruta para autenticacion de un usuario
router.post('/login', userController.login);

module.exports = router;
