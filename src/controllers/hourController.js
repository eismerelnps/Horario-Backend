// controllers/productController.js
const logger = require('../logs/logger');

// Importa el modelo de horario
const Hour = require('../models/hourModel');
//Importa el paquete express-validator
const { validationResult } = require('express-validator');




// const Product = require('../models/Product');

// Controlador para obtener todos los horarios
exports.getAllHours = async (req, res) => {
  try {
    const hours = await Hour.find();
    res.status(200).json(hours);
    logger.info('Todos los horarios obtenidos')
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los horarios', error });
    logger.error('Error al obtener los horarios')
  }
};


// Controlador para obtener un horario por su ID
exports.getHourById = async (req, res) => {
  try {
    const hour = await Hour.findById(req.params.id);
    if (!hour) {
      return res.status(404).json({ message: 'Horario no encontrado' });
    }
    res.status(200).json(hour);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el horario', error });
  }
};

// // Controlador para crear un nuevo producto
// exports.createProduct = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al crear el producto', error });
//   }
// };

// Importa el modelo de productos
  //const Product = require('../models/Product');




/*



  exports.createHour = async (req, res) => {
    try {
      // Verificar errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Obtén los datos del producto desde el cuerpo de la solicitud
      const { time, classAbr, classRoom, classType, className, teacher } = req.body;
  
      // Crea una nueva instancia del modelo hour con los datos del horario
      const newHour = new Hour({
        time, 
        classAbr, 
        classRoom, 
        classType, 
        className, 
        teacher
      });
  
      // Guarda el producto en la base de datos
      await newHour.save();
  
      // Envía una respuesta con el producto creado
      res.status(201).json({ message: 'Horario creado exitosamente', hour: newHour });
    } catch (error) {
      // En caso de error, envía una respuesta de error
      res.status(500).json({ message: 'Error al crear el horario', error });
    }
  };
  




// Controlador para actualizar un producto por su ID
exports.updateHourById = async (req, res) => {
  try {
    const updatedHour = await Hour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHour) {
      return res.status(404).json({ message: 'Horario no encontrado' });
    }
    res.status(200).json({ message: 'Horario actualizado exitosamente', hour: updatedHour });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el horario', error });
  }
};





// Controlador para eliminar un producto por su ID
exports.deleteHourById = async (req, res) => {
  try {
    const deletedHour = await Hour.findByIdAndDelete(req.params.id);
    if (!deletedHour) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente', hour: deletedHour });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};




*/