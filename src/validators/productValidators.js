const { body } = require('express-validator');

// Reglas de validación para crear un nuevo producto
exports.createProductValidators = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('model').notEmpty().withMessage('El modelo es requerido'),
  body('category').notEmpty().withMessage('La categoría es requerida'),
  body('currency').notEmpty().withMessage('La moneda es requerida'),
  body('price').notEmpty().withMessage('El precio es requerido').isNumeric().withMessage('El precio debe ser numérico'),
  body('image').notEmpty().withMessage('La imagen es requerida'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
];
