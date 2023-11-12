// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware');

const router = express.Router();


/*  PUBLICOS  */

// Ruta para autenticacion de un usuario
router.post('/login', userController.login);

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);


/*  AUTENTICACIÓN  */

// Ruta para actualizar los datos de un usuario
router.put('/update', middleware.authenticate, userController.update);

// Ruta para eliminar un usuario
router.delete('/delete', middleware.authenticate, userController.delete);


/*  PRUEBAS  */

// Ruta para comprobar el estado del token del usuario
router.post('/check', middleware.authenticate, userController.check);


/*  ADMINISTRADORES  */

// Ruta para obtener la lista de todos los usuarios
router.post('/admin/users', middleware.authenticate, middleware.checkPermissions("update"), userController.adminUsers);

// Ruta para actualizar datos de cualquier usuario
//router.update('/admin/update', middleware.authenticate, middleware.checkPermissions("update"), userController.adminUpdate);

// Ruta para eliminar un usuario
//router.delete('/admin/delete', middleware.authenticate, middleware.checkPermissions("delete"), userController.adminDelete);


module.exports = router;
