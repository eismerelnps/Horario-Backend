const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema({
  time: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
  },
  classAbr: {
    type: String,
    required: [true, 'El modelo del producto es obligatorio'],
  },
  classRoom: {
    type: String,
    required: [true, 'La categoría del producto es obligatoria'],
  },
  classType: {
    type: String,
    required: [true, 'La moneda del producto es obligatoria'],
  },

  className: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio'],
  },
  teacher: {
    type: Number,
    default: 0,
  },
});

const Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;
