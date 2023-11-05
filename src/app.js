const express = require("express");
const cors = require("cors");
//const morgan = require('morgan');
const logger = require('./logs/logger'); // Importa el logger

const winston = require('winston');
const consoleTransport = new winston.transports.Console();
winston.add(consoleTransport);

const { dbConnect } = require("./database/config");

const hourRouter = require("./routes/hourRoutes");
const userRouter = require("./routes/userRoutes");

// Configuración del servidor Express
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
//app.use(morgan('combined'));


app.get('/api/v1', (req, res) => {
  logger.info('Mensaje de registro desde una ruta de Express');
  res.send('Hello World');
});

//authentication route
app.use("/api/v1/users", userRouter);

//
app.use("/api/v1/hours", hourRouter);

// Middleware de error para manejar accesos no autorizados
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Acceso no autorizado" });
  } else {
    next(err);
  }
});

// Conexión a la base de datos
dbConnect();

// Puerto de escucha del servidor// Listen on `port` and 0.0.0.0
const port = process.env.PORT || 9000;
app.listen(port, "0.0.0.0", () => {
  logger.info(`Servidor en ejecución en el puerto ${port}`);

});