const { body } = require('express-validator');

// Reglas de validación para crear un nuevo producto
exports.createProductValidators = [
  body('time').notEmpty().withMessage('El turno de clase es requerido'),
  body('classAbr').notEmpty().withMessage('La abreviatura de clase es requerido'),
  body('classRoom').notEmpty().withMessage('El salon de clases es requerido'),
  body('classType').notEmpty().withMessage('El tipo de clase es requerido'),
//  body('className').notEmpty().withMessage('El precio es requerido').isNumeric().withMessage('El precio debe ser numérico'),
//  body('teacher').notEmpty().withMessage('La imagen es requerida'),
];
