// routes/productRoutes.js

const express = require('express');
const hourController = require('../controllers/hourController');
const middleware = require('../middleware/middleware');

const router = express.Router();


/**  MÉTODOS PRINCIPALES  **/

/**
 * Nota: get(../:id)  id => :
 *  > 'all' return all of Type
 *  > 'hours' return all parsed hours of type
 ***/


// Rutas para el control de una Facultad
router.get('/:faculty', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromAll);
//router.post('/:faculty', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createFaculty);
//router.put('/:faculty', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateFaculty);
//router.delete('/:faculty', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteFaculty);


// Rutas para el control de un año
router.get('/:faculty/:year', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromAll);
//router.post('/:faculty/:year', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createYear);
//router.put('/:faculty:/year', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateYear);
//router.delete('/:faculty/:year', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteYear);

// Rutas para el control de un grupo
router.get('/:faculty/:year/:group', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromAll);
//router.post('/:faculty/:year/:group', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createGroup);
//router.put('/:faculty:/year/:group', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateGroup);
//router.delete('/:faculty/:year/:group', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteGroup);


// Rutas para el control de una semana
router.get('/:faculty/:year/:group/:week', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromAll);
//router.post('/:faculty/:year/:group/:week', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createWeek);
//router.put('/:faculty:/year/:group/:week', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateWeek);
//router.delete('/:faculty/:year/:group/:week', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteWeek);

// Rutas para el control de un dia
router.get('/:faculty/:year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromAll);
//router.post('/:faculty/:year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createSchedule);
//router.put('/:faculty:/year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateSchedule);
//router.delete('/:faculty/:year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteSchedule);

// Rutas para el control de una clase
router.get('/:faculty/:year/:group/:week/:schedule/:sclass', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromAll);
//router.post('/:faculty/:year/:group/:week/:schedule/:classe', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createClass);
//router.put('/:faculty:/year/:group/:week/:schedule:/classe', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateClass);
//router.delete('/:faculty/:year/:group/:week/:schedule:/classe', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteClass);

// Rutas para el control de un profesor
router.get('/teachers/:teacher', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromTeachers);
//router.post('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createTeacher);
//router.put('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateTeacher);
//router.delete('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteTeacher);

// Rutas para el control de un modelo de horario
router.get('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromHourModels);
//router.post('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createHourModel);
//router.put('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateHourModel);
//router.delete('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteHourModel);

// Rutas para el control de un turno
router.get('/hourModel/:model/:hour', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromHourModels);
//router.post('/hourModel/:model/:hour', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createHourModelHour);
//router.put('/hourModel/:mode:/hour', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateHourModelHour);
//router.delete('/hourModel/:model/:hour', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteHourModelHour);



module.exports = router;
