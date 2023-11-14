// routes/productRoutes.js

const express = require('express');
const hourController = require('../controllers/hourController');
const middleware = require('../middleware/middleware');

const router = express.Router();


/**  MÉTODOS PRINCIPALES  **/

// Rutas para el control de una Facultad
router.get('/:faculty', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromFaculties);
//router.post('/:faculty', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createFaculty);
//router.put('/:faculty', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateFaculty);
//router.delete('/:faculty', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteFaculty);


// Rutas para el control de un año
router.get('/:faculty/:year', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromYears);
//router.post('/:faculty/:year', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createYear);
//router.put('/:faculty:/year', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateYear);
//router.delete('/:faculty/:year', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteYear);

// Rutas para el control de un grupo
router.get('/:faculty/:year/:group', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromGroups);
//router.post('/:faculty/:year/:group', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createGroup);
//router.put('/:faculty:/year/:group', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateGroup);
//router.delete('/:faculty/:year/:group', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteGroup);

/*
// Rutas para el control de una semana
router.get('/:faculty/:year/:group/:week', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromWeeks);
//router.post('/:faculty/:year/:group/:week', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createWeek);
//router.put('/:faculty:/year/:group/:week', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateWeek);
//router.delete('/:faculty/:year/:group/:week', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteWeek);

// Rutas para el control de un dia
router.get('/:faculty/:year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromSchedules);
//router.post('/:faculty/:year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createSchedule);
//router.put('/:faculty:/year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateSchedule);
//router.delete('/:faculty/:year/:group/:week/:schedule', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteSchedule);

// Rutas para el control de una clase
router.get('/:faculty/:year/:group/:week/:schedule/:classe', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromClasses);
//router.post('/:faculty/:year/:group/:week/:schedule/:classe', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createClass);
//router.put('/:faculty:/year/:group/:week/:schedule:/classe', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateClass);
//router.delete('/:faculty/:year/:group/:week/:schedule:/classe', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteClass);

// Rutas para el control de un profesor
router.get('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromTeachers);
//router.post('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createTeacher);
//router.put('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateTeacher);
//router.delete('/teacher/:teacher', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteTeacher);

// Rutas para el control de un modelo de horario
router.get('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromHourModels);
//router.post('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createHourModel);
//router.put('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateHourModel);
//router.delete('/hourModel/:model', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteHourModel);

// Rutas para el control de un turno
router.get('/hourModel/:model/:hour', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getFromHours);
//router.post('/hourModel/:model/:hour', middleware.authenticate, middleware.checkPermissions(["create"]), hourController.createHour);
//router.put('/hourModel/:mode:/hour', middleware.authenticate, middleware.checkPermissions(["update"]), hourController.updateHour);
//router.delete('/hourModel/:model/:hour', middleware.authenticate, middleware.checkPermissions(["delete"]), hourController.deleteHour);

*/

/**  OTROS MÉTODOS  **/

/*
router.get('/faculties/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromSchool);
router.get('/:faculty/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromFaculty);
router.get('/:faculty/years/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromYears);
router.get('/:faculty/:year/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromYear);
router.get('/:faculty/:year/groups/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromGroups);
router.get('/:faculty/:year/:group/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromGroup);
router.get('/:faculty/:year/:group/weeks/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromWeeks);
router.get('/:faculty/:year/:group/:week/all-hours', middleware.authenticate, middleware.checkPermissions(["read"]), hourController.getAllHoursFromWeek);
*/


module.exports = router;
