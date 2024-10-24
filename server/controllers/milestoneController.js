const Milestone = require('../models/milestoneModel');
const { formatResponse } = require('../utils/responseFormatter');

const milestoneController = {
  // Crear un nuevo hito
  async crear(req, res) {
    try {
      const { descripcion, objetivo, fechaEstablecida } = req.body;
      const nuevoHito = new Milestone({
        descripcion,
        objetivo,
        fechaEstablecida,
        usuarioId: req.user._id // Se asume que el usuario está autenticado
      });

      await nuevoHito.save();

      res.status(201).json(
        formatResponse(201, 'Hito creado exitosamente', nuevoHito)
      );
    } catch (error) {
      logger.error('Error al crear hito:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear hito')
      );
    }
  },

  // Obtener todos los hitos de un usuario
  async obtenerTodos(req, res) {
    try {
      const hitos = await Milestone.find({ usuarioId: req.user._id });
      res.json(
        formatResponse(200, 'Hitos obtenidos exitosamente', hitos)
      );
    } catch (error) {
      logger.error('Error al obtener hitos:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener hitos')
      );
    }
  },

  // Obtener un hito específico por ID
  async obtenerPorId(req, res) {
    try {
      const hito = await Milestone.findById(req.params.id);
      if (!hito) {
        return res.status(404).json(
          formatResponse(404, 'Hito no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Hito obtenido exitosamente', hito)
      );
    } catch (error) {
      logger.error('Error al obtener hito:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener hito')
      );
    }
  },

  // Actualizar un hito específico por ID
  async actualizar(req, res) {
    try {
      const { descripcion, objetivo, fechaEstablecida, fechaCumplimiento, logrado } = req.body;
      const hitoActualizado = await Milestone.findByIdAndUpdate(
        req.params.id,
        { descripcion, objetivo, fechaEstablecida, fechaCumplimiento, logrado },
        { new: true, runValidators: true }
      );
      if (!hitoActualizado) {
        return res.status(404).json(
          formatResponse(404, 'Hito no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Hito actualizado exitosamente', hitoActualizado)
      );
    } catch (error) {
      logger.error('Error al actualizar hito:', error);
      res.status(500).json(
        formatResponse(500, 'Error al actualizar hito')
      );
    }
  },

  // Eliminar un hito específico por ID
  async eliminar(req, res) {
    try {
      const hito = await Milestone.findByIdAndDelete(req.params.id);
      if (!hito) {
        return res.status(404).json(
          formatResponse(404, 'Hito no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Hito eliminado exitosamente')
      );
    } catch (error) {
      logger.error('Error al eliminar hito:', error);
      res.status(500).json(
        formatResponse(500, 'Error al eliminar hito')
      );
    }
  }
};

module.exports = milestoneController;
