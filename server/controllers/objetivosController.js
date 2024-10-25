const Objetivo = require('../models/objetivosModel');
const { formatResponse } = require('../utils/responseFormatter');

const objetivosController = {
  // Crear un nuevo objetivo
  async crear(req, res) {
    try {
      const { titulo, descripcion, fechaEstablecida } = req.body;
      const nuevoObjetivo = new Objetivo({
        titulo,
        descripcion,
        fechaEstablecida,
        usuarioId: req.user._id // Se asume que el usuario está autenticado
      });

      await nuevoObjetivo.save();

      res.status(201).json(
        formatResponse(201, 'Objetivo creado exitosamente', nuevoObjetivo)
      );
    } catch (error) {
      console.error('Error al crear objetivo:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear objetivo')
      );
    }
  },

  // Obtener todos los objetivos de un usuario
  async obtenerTodos(req, res) {
    try {
      const objetivos = await Objetivo.find({ usuarioId: req.user._id });
      res.json(
        formatResponse(200, 'Objetivos obtenidos exitosamente', objetivos)
      );
    } catch (error) {
      console.error('Error al obtener objetivos:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener objetivos')
      );
    }
  },

  // Obtener un objetivo específico por ID
  async obtenerPorId(req, res) {
    try {
      const objetivo = await Objetivo.findById(req.params.id);
      if (!objetivo) {
        return res.status(404).json(
          formatResponse(404, 'Objetivo no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Objetivo obtenido exitosamente', objetivo)
      );
    } catch (error) {
      console.error('Error al obtener objetivo:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener objetivo')
      );
    }
  },

  // Actualizar un objetivo específico por ID
  async actualizar(req, res) {
    try {
      const { titulo, descripcion, fechaEstablecida } = req.body;
      const objetivoActualizado = await Objetivo.findByIdAndUpdate(
        req.params.id,
        { titulo, descripcion, fechaEstablecida },
        { new: true, runValidators: true }
      );
      if (!objetivoActualizado) {
        return res.status(404).json(
          formatResponse(404, 'Objetivo no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Objetivo actualizado exitosamente', objetivoActualizado)
      );
    } catch (error) {
      console.error('Error al actualizar objetivo:', error);
      res.status(500).json(
        formatResponse(500, 'Error al actualizar objetivo')
      );
    }
  },

  // Eliminar un objetivo específico por ID
  async eliminar(req, res) {
    try {
      const objetivo = await Objetivo.findByIdAndDelete(req.params.id);
      if (!objetivo) {
        return res.status(404).json(
          formatResponse(404, 'Objetivo no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Objetivo eliminado exitosamente')
      );
    } catch (error) {
      console.error('Error al eliminar objetivo:', error);
      res.status(500).json(
        formatResponse(500, 'Error al eliminar objetivo')
      );
    }
  }
};

module.exports = objetivosController;
