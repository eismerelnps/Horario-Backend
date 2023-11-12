// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware');

const router = express.Router();


/*  PUBLICOS  */

// Ruta para autenticacion del usuario
router.post('/login', userController.login);

// Ruta para crear el nuevo usuario
router.post('/create-user', userController.createUser);


/*  AUTENTICACIÓN  */

// Ruta para actualizar los datos del propio usuario
router.put('/update', middleware.authenticate, userController.update);

// Ruta para eliminar el propio usuario
router.delete('/delete', middleware.authenticate, userController.delete);


/*  PRUEBAS  */

// Ruta para comprobar el estado del token del usuario
router.post('/check', middleware.authenticate, userController.check);


/*  ADMINISTRADORES  */


// Ruta para obtener los datos de un usuarios
router.post('/admin/user', middleware.authenticate, middleware.checkPermissions(["update"]), userController.adminUser);

// Ruta para obtener la lista de todos los usuarios
router.post('/admin/users', middleware.authenticate, middleware.checkPermissions(["update"]), userController.adminUsers);

// Ruta para actualizar datos de cualquier usuario
router.put('/admin/update', middleware.authenticate, middleware.checkPermissions(["update"]), userController.adminUpdate);

// Ruta para eliminar un usuario
router.delete('/admin/delete', middleware.authenticate, middleware.checkPermissions(["delete"]), userController.adminDelete);


module.exports = router;
