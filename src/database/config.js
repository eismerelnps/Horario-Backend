//config.js

require('dotenv').config();
const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST;
console.log(dbHost); // Imprime 'localhost'

const dbConnect = () => {
  mongoose.connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
    });
};

module.exports = {
  dbConnect
};
