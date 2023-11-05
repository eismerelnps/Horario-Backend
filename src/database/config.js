//config.js

require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../logs/logger');

const dbHost = process.env.DB_HOST;
//console.log(dbHost); 

const dbConnect = () => {
  mongoose.connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      logger.info('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
      logger.info('Error al conectar a la base de datos:', error);
    });
};

module.exports = {
  dbConnect
};
