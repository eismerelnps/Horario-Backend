const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema({
  time: {
    type: String,
  },
  classAbr: {
    type: String,
  },
  classRoom: {
    type: String,
    required: [true, 'El aula de la clase es obligatoria'],
  },
  classType: {
    type: String,
    required: [true, 'El tipo de clase es obligatoria'],
  },

  className: {
    type: Number,
    required: [true, 'El nombre de la clase es obligatoria'],
  },
  teacher: {
    type: Number,
    default: 0,
  },
});

const Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;
