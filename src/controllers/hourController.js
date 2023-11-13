// controllers/productController.js

const logger = require('../logs/logger');
const { Faculty } = require('../models/schoolModel');

const ObjectId = require("mongoose").Types.ObjectId;



/**  FUNCIONES BASICAS  **/

exports.getFaculty = getFromFaculty;
exports.getAllFaculties = getFromFaculty;


/**  FUNCIONES MULTIUSOS  **/

async function getFromFaculty(req, res) {
  try {
    const { faculty } = req.params;
    let find = null;

    if(faculty === 'all'){
       find = await Faculty.find();
       if (!find) return res.status(404).send({ message: 'No hay elementos!', data: null });
    }
    else  {
       find = await Faculty.findOne({ id: faculty });
       if (!find) return res.status(404).send({ message: `El (ID: '${id}') no existe!`, data: null });
    }

    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find });
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener los datos', error });
  }
}

         
