// controllers/productController.js

const logger = require('../logs/logger');
const { School } = require('../models/schoolModel');
const ObjectId = require("mongoose").Types.ObjectId;


/**  FUNCIONES BASICAS  **/

exports.getFromAll = async (req, res) => {
  try {
    const { faculty, year, group, week, schedule, sclass } = req.params;
    
    // Escuela
    const find = School.findOne({ id: req.user.school });
    if (!find) throw { code: 2, name: ' la Escuela', id: req.user.school };

    // Facultad
    if (!find.faculties || find.faculties.length === 0) throw { code: 3 };
    if (faculty == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties });
    let id = convertToNumber(faculty);
    if(typeof id !== 'number') throw id;
    let elm = find.faculties.findIndex(e => e.id === id);
    if (elm < 0) throw { code: 2, name: ' la Facultad', id };
    if (!year) return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm] });

    // Año
    if(!find.faculties[elm].years || find.faculties[elm].years.length === 0) throw { code: 3 };
    if (years == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years });
    id = convertToNumber(year);
    if(typeof id !== 'number') throw id;
    let elm2 = find.faculties[elm].years.findIndex(e => e.id === id);
    if (elm2 < 0) throw { code: 2, name: "l Año", id };
    if (!group) return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2] });

    // Grupo
    if(!find.faculties[elm].years[elm2].groups || find.faculties[elm].years[elm2].groups.length === 0) throw { code: 2 };
    if (group == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups });
    id = convertToNumber(group);
    if(typeof id !== 'number') throw id;
    let elm3 = find.faculties[elm].years[elm2].groups.findIndex(e => e.id === id);
    if (elm3 < 0) throw { code: 2, name: "l Grupo", id };
    if (!week) return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3] });
    
    // Semana
    if (!find.faculties[elm].years[elm2].groups[elm3].weeks || find.faculties[elm].years[elm2].groups[elm3].weeks.length === 0) throw { code: 2 };
    if (years == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3].weeks });
    id = convertToNumber(week);
    if(typeof id !== 'number') throw id;
    let elm4 = find.faculties[elm].years[elm2].groups[elm3].weeks.findIndex(e => e.id === id);
    if (elm4 < 0) throw { code: 2, name: " la Semana", id };
    if (!schedule) return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3].weeks[elm4] });
    
    // Horario
    if (!find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules || find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules.length === 0) throw { code: 2 };
    if (years == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules });
    id = convertToNumber(schedule);
    if(typeof id !== 'number') throw id;
    let elm5 = find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules.findIndex(e => e.id === id);
    if (elm5 < 0) throw { code: 2, name: "l Horario", id };
    if (!sclass) return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules[elm5] });

    // Clase
    if (!find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules[elm5].classes || find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules[elm].classes.length === 0) throw { code: 2 };
    if (years == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules.classes });
    id = convertToNumber(sclass);
    if(typeof id !== 'number') throw id;
    let elm6 = !find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules[elm5].classes.findIndex(e => e.id === id);
    if (elm6 < 0) throw { code: 2, name: " la clase", id };
    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.faculties[elm].years[elm2].groups[elm3].weeks[elm4].schedules[elm5].classes[elm6] });
    
  } catch (error) {
    if(err.code === 2) return res.status(500).send({ message: `El id '${error.id}' de${error.name} no existe!`, data: null });
    if(error.code === 3) return res.status(500).send({ message: 'No hay elementos!', data: null });
    return res.status(500).send({ message: 'Error al obtener los datos!', data: null });
  }
};

exports.getFromTeachers = async (req, res) => {
  try {
    const { teacher } = req.params;
    
    // Escuela
    const find = School.findOne({ id: req.user.school });
    if (!find) throw { code: 2, name: ' la Escuela', id: req.user.school };

    // Profesor
    if(find.teachers || find.teachers.length === 0) throw { code: 3 };
    if (faculty == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.teachers });
    let id = convertToNumber(teacher);
    if(typeof id !== 'number') throw id;
    let elm = find.teachers.findIndex(e => e.id === id);
    if (elm < 0) throw { code: 2, name: ' el profesor', id };
    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.teachers[elm] });
    
  } catch (error) {
    if(err.code === 2) return res.status(500).send({ message: `El id '${error.id}' de${error.name} no existe!`, data: null });
    if(error.code === 3) return res.status(500).send({ message: 'No hay elementos!', data: null });
    return res.status(500).send({ message: 'Error al obtener los datos!', data: null });
  }
};

exports.getFromHourModels = async (req, res) => {
  try {
    const {model, hour} = req.params;
    
    // Escuela
    const find = School.findOne({ id: req.user.school });
    if (!find) throw { code: 2, name: ' la Escuela', id: req.user.school };

    // Modelo de Horario 
    if(find.hourModels || find.hourModels.length === 0) throw { code: 3 };
    if (model == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.hourModels });
    let id = convertToNumber(model);
    if(typeof id !== 'number') throw id;
    let elm = find.hourModels.findIndex(e => e.id === id);
    if (elm < 0) throw { code: 2, name: ' el modelo de horario', id };
    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.hourModels[elm] });

    // Horario de Turno
    if(find.hourModels[elm].hours || find.hourModels[elm].hours.length === 0) throw { code: 3 };
    if (model == 'all') return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.hourModels[elm].hours });
    let id = convertToNumber(hour);
    if(typeof id !== 'number') throw id;
    let elm2 = find.hourModels[elm].hours.findIndex(e => e.id === id);
    if (elm2 < 0) throw { code: 2, name: ' el rurno', id };
    return res.status(200).send({ message: 'Datos obtenidos correctamente', data: find.hourModels[elm].hours[elm2] });
   
  } catch (error) {
    if(err.code === 2) return res.status(500).send({ message: `El id '${error.id}' de${error.name} no existe!`, data: null });
    if(error.code === 3) return res.status(500).send({ message: 'No hay elementos!', data: null });
    return res.status(500).send({ message: 'Error al obtener los datos!', data: null });
  }
};


function convertToNumber(value) {
  try {
    if (isNaN(value))  {
       throw {
          name: 'isNaN',
          message: 'No se puede convertir un texto no num�rico!',
          data: { value },
      };
    }
    return Number(value);
  } catch (e) {
    return e;
  }
}
        
