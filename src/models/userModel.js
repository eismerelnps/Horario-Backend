const mongoose = require("mongoose");

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"], // Campo obligatorio
    unique: true, // El nombre de usuario debe ser único
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"], // Campo obligatorio
  },
  email: {
    type: String,
    required: false, // Campo opcional
  },
  role: {
    type: String,
    default: 'user',
  },
  faculty: {
    type: String,
    required: [true, "La facultad es obligatoria"],
  },
  year: {
    type: Integer,
    required: [true, "El año es obligatorio"],
  },
  group: {
    type: Integer,
    required: [true, "El grupo es obligatorio"],
  }
});

// Creación del modelo User basado en el esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
