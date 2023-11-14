// controllers/productController.js

const logger = require('../logs/logger');
const { School } = require('../models/schoolModel');

const ObjectId = require("mongoose").Types.ObjectId;


/**  FUNCIONES BASICAS  **/

exports.getFromFaculties = async (req, res) => {
  try {
    const { faculty } = req.params;
    let find = null;
    let id = null;

    find = School.findOne({ id: req.user.school });
    if (!find) return res.status(404).send({ message: `La Escuela de id = ${req.user.school}' no existe!`, data: null });

    if (faculty === 'all') {
      find = await find.faculties.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      id = convertToNumber(faculty);
      if(typeof id !== 'number') throw id;
      find = await find.faculties.findOne({ id });
      if (!find) return res.status(404).send({ message: `La facultad de id = '${id}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

exports.getFromYears = async (req, res) => {
  try {
    const { faculty, year } = req.params;
    let find = null;
    let id = null;

    find = School.findOne({ id: req.user.school });
    if (!find) return res.status(404).send({ message: `La Escuela de id = ${req.user.school}' no existe!`, data: null });


    id = convertToNumber(faculty);
    if(typeof id !== 'number') throw id;
    find = await find.faculties.findOne({ id });
    if (!find) return res.status(404).send({ message: `La Facultad de id = '${id}' no existe!`, data: null });

    if(faculty === 'all') {
      find = await find.years.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      id = convertToNumber(year);
      if(typeof id !== 'number') throw id;
      find = await find.years.findOne({ id });
      if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

exports.getFromGroups = async (req, res) => {
  try {
    const { faculty, year, group } = req.params;
    let find = null;
    let id = null;

    find = School.findOne({ id: req.user.school });
    if (!find) return res.status(404).send({ message: `La Escuela de id = ${req.user.school}' no existe!`, data: null });

    id = convertToNumber(faculty);
    if(typeof id !== 'number') throw id;
    find = await find.faculties.findOne({ id });
    if (!find) return res.status(404).send({ message: `La Facultad de id = '${id}' no existe!`, data: null });

   id = convertToNumber(year);
   if(typeof id !== 'number') throw id;
   find = await find.years.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

    if(faculty === 'all') {
      find = await find.groups.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      id = convertToNumber(group);
      if(typeof id !== 'number') throw id;
      find = await find.groups.findOne({ id });
      if (!find) return res.status(404).send({ message: `El grupo de id = '${id}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

exports.getFromWeeks = async (req, res) => {
  try {
    const { faculty, year, group, week } = req.params;
    let find = null;
    let id = null;

    find = School.findOne({ id: req.user.school });
    if (!find) return res.status(404).send({ message: `La Escuela de id = ${req.user.school}' no existe!`, data: null });

    id = convertToNumber(faculty);
    if(typeof id !== 'number') throw id;
    find = await find.faculties.findOne({ id });
    if (!find) return res.status(404).send({ message: `La Facultad de id = '${id}' no existe!`, data: null });

   id = convertToNumber(year);
   if(typeof id !== 'number') throw id;
   find = await find.years.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

   id = convertToNumber(group);
   if(typeof id !== 'number') throw id;
   find = await find.years.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

    if(faculty === 'all') {
      find = await find.weeks.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      id = convertToNumber(week);
      if(typeof id !== 'number') throw id;
      find = await find.weeks.findOne({ id });
      if (!find) return res.status(404).send({ message: `La semana de id = '${id}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

exports.getFromSchedules = async (req, res) => {
  try {
    const { faculty, year, group, week, schedule } = req.params;
    let find = null;
    let id = null;

    find = School.findOne({ id: req.user.school });
    if (!find) return res.status(404).send({ message: `La Escuela de id = ${req.user.school}' no existe!`, data: null });

    id = convertToNumber(faculty);
    if(typeof id !== 'number') throw id;
    find = await find.faculties.findOne({ id });
    if (!find) return res.status(404).send({ message: `La Facultad de id = '${id}' no existe!`, data: null });

   id = convertToNumber(year);
   if(typeof id !== 'number') throw id;
   find = await find.years.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

   id = convertToNumber(group);
   if(typeof id !== 'number') throw id;
   find = await find.groups.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

   id = convertToNumber(week);
   if(typeof id !== 'number') throw id;
   find = await find.weeks.findOne({ id });
   if (!find) return res.status(404).send({ message: `La semana de id = '${id}' no existe!`, data: null });

    if(faculty === 'all') {
      find = await find.schedules.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      id = convertToNumber(schedule);
      if(typeof id !== 'number') throw id;
      find = await find.schedules.findOne({ id });
      if (!find) return res.status(404).send({ message: `El horario de id = '${id}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

exports.getFromClasses = async (req, res) => {
  try {
    const { faculty, year, group, week, schedule, sclass } = req.params;
    let find = null;
    let id = null;

    find = School.findOne({ id: req.user.school });
    if (!find) return res.status(404).send({ message: `La Escuela de id = ${req.user.school}' no existe!`, data: null });

    id = convertToNumber(faculty);
    if(typeof id !== 'number') throw id;
    find = await find.faculties.findOne({ id });
    if (!find) return res.status(404).send({ message: `La Facultad de id = '${id}' no existe!`, data: null });

   id = convertToNumber(year);
   if(typeof id !== 'number') throw id;
   find = await find.years.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

   id = convertToNumber(group);
   if(typeof id !== 'number') throw id;
   find = await find.groups.findOne({ id });
   if (!find) return res.status(404).send({ message: `El año de id = '${id}' no existe!`, data: null });

   id = convertToNumber(week);
   if(typeof id !== 'number') throw id;
   find = await find.weeks.findOne({ id });
   if (!find) return res.status(404).send({ message: `La semana de id = '${id}' no existe!`, data: null });

   id = convertToNumber(schedule);
   if(typeof id !== 'number') throw id;
   find = await find.schedules.findOne({ id });
   if (!find) return res.status(404).send({ message: `El horario de id = '${id}' no existe!`, data: null });

    if(faculty === 'all') {
      find = await find.classes.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      id = convertToNumber(schedule);
      if(typeof id !== 'number') throw id;
      find = await find.classes.findOne({ id });
      if (!find) return res.status(404).send({ message: `La clase de id = '${id}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}


function convertToNumber(value) {
  try {
    if (isNaN(value))  {
       throw {
          name: 'isNaN',
          message: 'No se puede convertir un texto no numérico!',
          data: { value },
      };
    }
    return Number(value);
  } catch (e) {
    return e;
  }
}
       
