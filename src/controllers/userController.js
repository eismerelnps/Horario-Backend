// userController.js

const User = require('../models/userModel');
const ObjectId = require("mongoose").Types.ObjectId;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Controlador para autenticar un usuario
exports.createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario y/o email ya existen' });
    }

    //Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea una nueva instancia del modelo User con los datos del usuario
    var newUser = new User({ username, password: hashedPassword, email });

    // Guarda el usuario en la base de datos
    await newUser.save();
    
    // Crear contenedor con los datos que seran enviados
    let user = {
      username: newUser.username,
      email: newUser.email,
      faculty: newUser.faculty,
      group: newUser.group,
      year: newUser.year,
      token: '',
    };

    // Generar el token JWT
    user.token = jwt.sign({ id: newUser._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    // Enviar los datos en la respuesta
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};


// Función para verificar las credenciales del usuario y generar un token JWT
exports.login = async (req, res) => {
    try {
      const { identifier, password } = req.body;
  
      // Buscar al usuario o email  en la base de datos
      const findUser = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      });
      
      if (!findUser) {
        return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, findUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
      }

      // Crear contenedor con los datos que seran enviados
      let user = {
        username: findUser.username,
        email: findUser.email,
        faculty: findUser.faculty,
        group: findUser.group,
        year: findUser.year,
        token: '',
      };

      // Generar el token JWT
      user.token = jwt.sign({ id: findUser._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Enviar los datos en la respuesta
      res.status(200).json({ message: 'Usuario autenticado correctamente', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al autenticar el usuario', error });
    }
  };

exports.check = async (req, res) => {
   try {
   const { token } = req.body;
   
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

   const { id } = await jwt.verify(token, process.env.JWT_SECRET);

   const findUser = await User.findById(id);

    if (!findUser) {
        return res.status(401).json({ message: 'Acceso denegado' });
      }

     // Crear contenedor con los datos que seran enviados
     const user = {
        username: findUser.username,
        email: findUser.email,
        faculty: findUser.faculty,
        group: findUser.group,
        year: findUser.year,
        token: token,
     };

     console.log("[user>check] (ok)", user);

      // Enviar los datos en la respuesta
      res.status(200).json({ message: 'Usuario autenticado correctamente', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al autenticar el usuario', error });

      console.log("[user>check] (no)", error);
    }
};

exports.update = async (req, res) => {
   try {
   const { token, username, password, new_password, email, faculty, group, year } = req.body;
   
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

   const { id } = await jwt.verify(token, process.env.JWT_SECRET);

   let findUser = await User.findById(id);

    if (!findUser) {
        return res.status(401).json({ message: 'Acceso denegado' });
      }

     // Verificar la contraseña
      let passwordMatch = await bcrypt.compare(password, findUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'contraseña antigua incorrecta' });
      }

     // Crea variable vacia para guardar los datos a ser actualizados
     let data = { };
 
     // Guarda los datos si hay cambios
     if (username && username.trim() !== '' && username != findUser.username) data.username = username;
     if (email && email.trim() !== '' && email != findUser.email) data.email = email;
     if (new_password && new_password.trim() !== '' && new_password != password) data.password = new_password;
     if (faculty && faculty != findUser.faculty) data.faculty = faculty;
     if (group && group != findUser.group) data.group = group;
     if (year && year != findUser.year) data.year = year;

     if(data.password) {
       if(data.password.length === 0) {
        delete data.password;
       }
       if(data.password.length < 7) {
         throw {
         name: 'InvalidNewPasswordError',
         text: 'contraseña muy corta',
         data: data,
        };
       }
     }
     
     // Comprueba que no hallan cambios en la actualización
     if(Object.keys(data).length === 0) {
       throw {
         name: 'UserNotChangesError',
         text: 'No se encontraron cambios en los datos a actualizar ',
         data: data,
        };
     }
 
     // Comprobar si ya existe el usuario y/o el email ( son de tipo unico )
     if(data.username && data.email) {
       findUser = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }]
       });
     }
     else if(data.username) {
        findUser = await User.findOne({ username: data.username });
     }
     else if(data.email) {
        findUser = await User.findOne({ email: data.email });
     }
     else {
        findUser = null;
     }

    // Si existe alguna coincidencia envia el error
     if(findUser) {
       throw {
         name: 'UserUpdateError',
         text: 'El nombre de usuario o el email estan en uso',
         data: data,
        };
     }

     // Actualizar los datos en la base de datos
     const updateUser = await User.updateMany({ _id: new ObjectId(id) }, { $set: data });

     // Si no hay ningun cambio en los datos en la base de datos envia un error
     if(updateUser.nModified === 0) {
       throw {
         name: 'UserUpdateError',
         text: 'No se pudieron actualizar los datos',
         data: data,
        };
     }

    // Obtiene el elemento de nuevo (ya actualizado)
    findUser = await User.findById(id);

    // Pruueba que exista
    if (!findUser) {
        throw {
         name: 'UserUpdateError',
         text: 'No se pudieron comprobar los datos actualizados',
         data: data,
        };
      }

     // Crear contenedor con los datos que seran enviados
     let user = {
        username: findUser.username,
        email: findUser.email,
        faculty: findUser.faculty,
        group: findUser.group,
        year: findUser.year,
        token: '',
     };
     
     // Generar el token JWT
     user.token = jwt.sign({ id: findUser._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Enviar los datos en la respuesta
      res.status(200).json({ message: 'Usuario actualizado correctamente', user });
    } catch (error) {
      if(error.text) res.status(500).json({ message: error.text, error });
      else res.status(500).json({ message: 'Error al actualizar los datos del usuario', error });
    }
};

// Función para eliminar a un usuario
exports.delete = async (req, res) => {
    try {
      const { token, password } = req.body;

      if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
  
     const { id } = await jwt.verify(token, process.env.JWT_SECRET);
  
     let findUser = await User.findById(id);
      
      if (!findUser) {
        return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, findUser.password);
      if (!passwordMatch) {
        console.log({password, fup: findUser.password});
        return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
      }

      const deleteUser = await User.findByIdAndDelete(id);
      
      if(!deleteUser) {
        throw {
          name: 'ErrorUserDelete',
          text: 'Error al eliminar el usuario',
          data: null,
        }
      }
      
      // Enviar los datos en la respuesta
      res.status(200).json({ message: 'Usuario eliminado correctamente', deleted: true });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  };
