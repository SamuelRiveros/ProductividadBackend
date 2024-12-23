const Reminder = require('../models/reminderModel');
const { formatResponse } = require('../utils/responseFormatter');

const reminderController = {
  // Crear recordatorio
  async crear(req, res) {
    try {
      const { mensaje, fecha, actividadId } = req.body;
      const nuevoRecordatorio = new Reminder({
        mensaje,
        fecha,
        usuarioId: req.user._id, // Se asume que el usuario está autenticado
        actividadId
      });

      await nuevoRecordatorio.save();

      res.status(201).json(
        formatResponse(201, 'Recordatorio creado exitosamente', nuevoRecordatorio)
      );
    } catch (error) {
      logger.error('Error al crear recordatorio:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear recordatorio')
      );
    }
  },

  // Obtener todos los recordatorios de un usuario
  async obtenerTodos(req, res) {
    try {
      const recordatorios = await Reminder.find({ usuarioId: req.user._id });
      res.json(
        formatResponse(200, 'Recordatorios obtenidos exitosamente', recordatorios)
      );
    } catch (error) {
      logger.error('Error al obtener recordatorios:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener recordatorios')
      );
    }
  },

  // Obtener un recordatorio específico por ID
  async obtenerPorId(req, res) {
    try {
      const recordatorio = await Reminder.findById(req.params.id);
      if (!recordatorio) {
        return res.status(404).json(
          formatResponse(404, 'Recordatorio no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Recordatorio obtenido exitosamente', recordatorio)
      );
    } catch (error) {
      logger.error('Error al obtener recordatorio:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener recordatorio')
      );
    }
  },
    // Actualizar un recordatorio específico por ID
    async actualizar(req, res) {
        try {
          const { mensaje, fecha, actividadId } = req.body;
          const recordatorioActualizado = await Reminder.findByIdAndUpdate(
            req.params.id,
            { mensaje, fecha, actividadId },
            { new: true, runValidators: true }
          );
          if (!recordatorioActualizado) {
            return res.status(404).json(
              formatResponse(404, 'Recordatorio no encontrado')
            );
          }
          res.json(
            formatResponse(200, 'Recordatorio actualizado exitosamente', recordatorioActualizado)
          );
        } catch (error) {
          logger.error('Error al actualizar recordatorio:', error);
          res.status(500).json(
            formatResponse(500, 'Error al actualizar recordatorio')
          );
        }
      },
    
      // Eliminar un recordatorio específico por ID
      async eliminar(req, res) {
        try {
          const recordatorio = await Reminder.findByIdAndDelete(req.params.id);
          if (!recordatorio) {
            return res.status(404).json(
              formatResponse(404, 'Recordatorio no encontrado')
            );
          }
          res.json(
            formatResponse(200, 'Recordatorio eliminado exitosamente')
          );
        } catch (error) {
          logger.error('Error al eliminar recordatorio:', error);
          res.status(500).json(
            formatResponse(500, 'Error al eliminar recordatorio')
          );
        }
      }

};

module.exports = reminderController;
