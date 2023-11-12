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
    required: [true, "El email es obligatorio"],
    unique: true, // El email debe ser único
  },
  role: {
    type: String,
    default: 'user',
  },
  faculty: {
    type: String,
    default: '',
  },
  year: {
    type: Number,
    default: 0,
  },
  group: {
    type: Number,
    default: 0,
  }
});

// Creación del modelo User basado en el esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
