// controllers/productController.js

const logger = require('../logs/logger');
const { Faculty } = require('../models/schoolModel');

const ObjectId = require("mongoose").Types.ObjectId;



/**  FUNCIONES BASICAS  **/

exports.getFaculty = getFromFaculty;
exports.getAllFaculties = getFromFaculty;
exports.getYear = getFromYear;
exports.getAllYears = getFromYear;


/**  FUNCIONES MULTIUSOS  **/

async function getFromFaculty(req, res) {
  try {
    const { faculty } = req.params;
    let find = null;

    if(faculty === 'all') {
      find = await Faculty.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      let facultyId = convertToNumber(faculty);
      if(typeof facultyId !== 'number') throw facultyId;
      find = await Faculty.findOne({ id: facultyId });
      if (!find) return res.status(404).send({ message: `La facultad de id = '${facultyId}' no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

async function getFromYear(req, res) {
  try {
    const { faculty, year } = req.params;
    let find = null;

    let facultyId = convertToNumber(faculty);
    if(typeof facultyId !== 'number') throw facultyId;
    find = await Faculty.findOne({ id: facultyId });
    if (!find) return res.status(404).send({ message: `La Facultad de id = '${facultyId}' no existe!`, data: null });

    if(faculty === 'all') {
      find = await find.years.find();
      if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
      let yearId = convertToNumber(yearId);
      if(typeof yearId !== 'number') throw yearId;
      find = await find.years.findOne({ id: yearId });
      if (!find) return res.status(404).send({ message: `El año de id = '${facultyId}' no existe!`, data: null });
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
