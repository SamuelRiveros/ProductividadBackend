const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { formatResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const userController = {
  // Crear usuario
  async crear(req, res) {
    try {
      const { nombre, apellido, email, contrasena } = req.body;
      
      const usuarioExistente = await User.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json(
          formatResponse(400, 'El email ya está registrado')
        );
      }

      const usuario = new User({
        nombre,
        apellido,
        email,
        contrasena_hash: contrasena
      });

      await usuario.save();

      // Excluir contraseña de la respuesta
      const usuarioResponse = usuario.toObject();
      delete usuarioResponse.contrasena_hash;

      res.status(201).json(
        formatResponse(201, 'Usuario creado exitosamente', usuarioResponse)
      );
    } catch (error) {
        logger.error('Error al crear usuario:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear usuario')
      );
    }
  },
    // Iniciar sesión
    async iniciarSesion(req, res) {
        try {
          const { email, contrasena } = req.body;
    
          const usuario = await User.findOne({ email });
          if (!usuario) {
            return res.status(401).json(
              formatResponse(401, 'Credenciales inválidas')
            );
          }
    
          const esValido = await usuario.compararContrasena(contrasena);
          if (!esValido) {
            return res.status(401).json(
              formatResponse(401, 'Credenciales inválidas')
            );
          }
    
          // Actualizar última sesión
          usuario.ultima_sesion = new Date();
          await usuario.save();
    
          // Crear token
          const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
          );
    
          const usuarioResponse = {
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            fecha_y_hora_de_inicio_de_sesion: usuario.ultima_sesion
          };
    
          res.json(
            formatResponse(200, 'Inicio de sesión exitoso', {
              usuario: usuarioResponse,
              token
            })
          );
        } catch (error) {
          logger.error('Error en inicio de sesión:', error);
          res.status(500).json(
            formatResponse(500, 'Error en el inicio de sesión')
          );
        }
      },

    // Obtener todos los usuarios
    async obtenerTodos(req, res) {
        try {
        const usuarios = await User.find().select('-contrasena_hash');
        res.json(
            formatResponse(200, 'Usuarios obtenidos exitosamente', usuarios)
        );
        } catch (error) {
        logger.error('Error al obtener usuarios:', error);
        res.status(500).json(
            formatResponse(500, 'Error al obtener usuarios')
        );
        }
    },

    // Obtener usuario por ID
    async obtenerPorId(req, res) {
        try {
        const usuario = await User.findById(req.params.id).select('-contrasena_hash');
        if (!usuario) {
            return res.status(404).json(
            formatResponse(404, 'Usuario no encontrado')
            );
        }

        res.json(
            formatResponse(200, 'Usuario obtenido exitosamente', usuario)
        );
        } catch (error) {
        logger.error('Error al obtener usuario:', error);
        res.status(500).json(
            formatResponse(500, 'Error al obtener usuario')
        );
        }
    },
    // Actualizar usuario
    async actualizar(req, res) {
        try {
        const { nombre, apellido, email } = req.body;
        
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json(
            formatResponse(404, 'Usuario no encontrado')
            );
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.apellido = apellido || usuario.apellido;
        usuario.email = email || usuario.email;

        await usuario.save();

        const usuarioResponse = usuario.toObject();
        delete usuarioResponse.contrasena_hash;

        res.json(
            formatResponse(200, 'Usuario actualizado exitosamente', usuarioResponse)
        );
        } catch (error) {
        logger.error('Error al actualizar usuario:', error);
        res.status(500).json(
            formatResponse(500, 'Error al actualizar usuario')
        );
        }
    },
    // Eliminar usuario
    async eliminar(req, res) {
        try {
        const usuario = await User.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json(
            formatResponse(404, 'Usuario no encontrado')
            );
        }

        res.json(
            formatResponse(200, 'Usuario eliminado exitosamente')
        );
        } catch (error) {
        logger.error('Error al eliminar usuario:', error);
        res.status(500).json(
            formatResponse(500, 'Error al eliminar usuario')
        );
        }
    },
    // Validar sesión
    async validarSesion(req, res) {
        try {
        const usuario = await User.findById(req.user.id).select('-contrasena_hash');
        if (!usuario) {
            return res.status(404).json(
            formatResponse(404, 'Usuario no encontrado')
            );
        }

        res.json(
            formatResponse(200, 'Sesión válida', usuario)
        );
        } catch (error) {
        logger.error('Error al validar sesión:', error);
        res.status(500).json(
            formatResponse(500, 'Error al validar sesión')
        );
        }
    },
}

module.exports = userController;