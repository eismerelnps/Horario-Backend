// userController.js

const User = require('../models/userModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();





// Controlador para autenticar un usuario
exports.createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    //Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea una nueva instancia del modelo User con los datos del usuario
    const newUser = new User({ username, password: hashedPassword, email });

    // Guarda el usuario en la base de datos
    await newUser.save();
    
    // Generar el token JWT
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1 month' });

    const user = Object.assign({ token }, newUser);
    delete user.password;
                               
    // Envía una respuesta con el usuario creado
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};


// Función para verificar las credenciales del usuario y generar un token JWT
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Buscar al usuario en la base de datos
      const findUser = await User.findOne({ username });
      if (!findUser) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, findUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Generar el token JWT
      const token = jwt.sign({ id: findUser._id, email: findUser.email }, process.env.JWT_SECRET, { expiresIn: '1 month' });

      const user = Object.assign({ token }, findUser);
      delete user.password;

      // Enviar los datos en la respuesta
      res.status(200).json({ message: 'Usuario autenticado correctamente', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al autenticar el usuario', error });
    }
  };


