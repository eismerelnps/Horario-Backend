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
      role: newUser.role,
      token: '',
    };

    // Generar el token JWT
    user.token = jwt.sign({ id: newUser._id.toString(), email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
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
      role: findUser.role,
      token: '',
    };

    // Generar el token JWT
    user.token = jwt.sign({ id: findUser._id.toString(), email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Enviar los datos en la respuesta
    res.status(200).json({ message: 'Usuario autenticado correctamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar el usuario', error });
  }
};

exports.check = async (req, res) => {
  res.status(200).json({ message: 'Usuario autenticado correctamente' });
};

exports.update = async(req, res) => {
  await updateUser(req, res);
};

exports.delete = async (req, res) => {
  await deleteUser(req, res);
}

exports.adminUsers = async(req, res) => {
  await getUsers(req, res);
};

exports.adminUser = async(req, res) => {
  try {
    const { targetId } = req.body;

    const findUser = await User.findById(targetId);
    
    if (!findUser) {
      throw {
        name: 'InvalidIdError',
        text: 'Id de usuario a actualizar incorrecto',
        data: null
      };
    }
    
    // Guardar el id del usuario objetivo
    req.user.targetId = targetId;

    // Enviar datos a la función
    await getUsers(req, res);

  } catch(error) {
    res.status(500).json({ message: 'Id de usuario a obtener incorrecto', error });
  } 
};

exports.adminUpdate = async (req, res) => {
  try {
    const { targetId } = req.body;

    const findUser = await User.findById(targetId);
    
    if (!findUser) {
      throw {
        name: 'InvalidIdError',
        text: 'Id de usuario a actualizar incorrecto',
        data: null
      };
    }

    // Guardar el id del usuario objetivo
    req.user.targetId = targetId;

    // Enviar datos a la función
    await updateUser(req, res);

  } catch(error) {
    res.status(500).json({ message: 'Id de usuario a actualizar incorrecto', error });
  } 
};

exports.adminDelete = async (req, res) => {
  try {
    const { targetId } = req.body;

    const findUser = await User.findById(targetId);
    
    if (!findUser) {
      throw {
        name: 'InvalidIdError',
        text: 'Id de usuario a actualizar incorrecto',
        data: null
      };
    }

    // Guardar el id del usuario objetivo
    req.user.targetId = targetId;

    // Enviar datos a la función
    await deleteUser(req, res);

  } catch(error) {
    res.status(500).json({ message: 'Id de usuario a actualizar incorrecto', error });
  }
};



/**  FUNCIONES MULTIUSOS  **/

// Función para obtener los datos de uno o todos los usuarios
async function getUsers(req, res) {
  try {
    const { password } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
  
    let findUser = await User.findById(req.user.id);
    
    if (!findUser) {
      return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
    }
  
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
    }

    if(req.user.targetId) {
      // Guarda los datos del usuario en el id objetivo
      result = await User.findById(req.user.targetId);
    }
    else {
      // Guarda la lista de datos de los usuarios
      result = await User.find();
    }

    // Comprueba que los datos se hayan recibido correctamente
    if(!result) {
      throw {
        name: 'UsersGetError',
        text: 'Error al obtener los datos de los usuarios',
        data: result
      };
    }

    // Retorna los datos de los usuarios 
    res.status(200).json({ message: 'Datos obtenidos correctamente', result});
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los datos', error });
  }
}

// Función para actualizar un usuario 
async function updateUser(req, res) {
  try {
    const { username, password, new_password, email, faculty, group, year, role } = req.body;
   
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
     
    let findUser = await User.findById(req.user.id);

    if (!findUser) {
      return res.status(401).json({ message: 'Acceso denegado' });
    }

    // Verificar la contraseña
    let passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'contraseña incorrecta' });
    }

    // Si hay un objeto, Guarda los datos del usuario 
    if(req.user.targetId) findUser = await User.findById(req.user.targetId);
    
    // Crea variable vacia para guardar los datos a ser actualizados
    let data = { };
 
    // Guarda los datos si hay cambios
    if (username && username.trim() !== '' && username != findUser.username) data.username = username;
    if (email && email.trim() !== '' && email != findUser.email) data.email = email;
    if (new_password && new_password.trim() !== '' && new_password != password) data.password = new_password;
    if (faculty && faculty != findUser.faculty) data.faculty = faculty;
    if (group && group != findUser.group) data.group = group;
    if (year && year != findUser.year) data.year = year;
    if(req.user.targetId && role && role.trim() !== '' && role != findUser.role) data.role = role;
    
    if(data.password) {
      if(data.password.length === 0) {
        delete data.password;
      }
      else if(data.password.length < 7) {
        throw {
          name: 'InvalidNewPasswordError',
          text: 'contraseña muy corta',
          data: data,
        };
      }
      else {
        // Generar el hash de la contraseña
        data.password = await bcrypt.hash(data.password, 10);
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
    let updateUser = null;

    if(req.user.targetId) updateUser = await User.updateMany({ _id: new ObjectId(req.user.targetId) }, { $set: data });
    else updateUser = await User.updateMany({ _id: new ObjectId(req.user.id) }, { $set: data });

    // Si no hay ningun cambio en los datos en la base de datos envia un error
    if(updateUser.nModified === 0) {
      throw {
        name: 'UserUpdateError',
        text: 'No se pudieron actualizar los datos',
        data: data,
      };
    }

    // Obtiene el elemento de nuevo (ya actualizado)
    if(req.user.targetId) findUser = await User.findById(req.user.targetId);
    else findUser = await User.findById(req.user.id);

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
      role: findUser.role
    };
     
    // Si no hay un id objetivo, Generar el token JWT
    if(!req.user.targetId) user.token = jwt.sign({ id: req.user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Enviar los datos en la respuesta
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    if(error.text) res.status(500).json({ message: error.text, error });
    else res.status(500).json({ message: 'Error al actualizar los datos del usuario', error });
  }
};

// Función para eliminar a un usuario
async function deleteUser(req, res) {
  try {
    const { password } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
  
    let findUser = await User.findById(req.user.id);
    
    if (!findUser) {
      return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
    }
  
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'usuario o contraseña incorrectos' });
    }

    // Eliminar usuario
    let deleteUser = null;

    if(req.user.targetId) deleteUser = await User.findByIdAndDelete(req.user.targetId);
    else deleteUser = await User.findByIdAndDelete(req.user.id);
    
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


