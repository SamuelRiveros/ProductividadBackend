const Report = require('../models/reportModel');
const { formatResponse } = require('../utils/responseFormatter');

const reportController = {
  // Crear un nuevo reporte
  async crear(req, res) {
    try {
      const { periodo, actividades } = req.body;
      const nuevoReporte = new Report({
        usuarioId: req.user._id, // Se asume que el usuario está autenticado
        periodo,
        actividades
      });

      await nuevoReporte.save();

      res.status(201).json(
        formatResponse(201, 'Reporte creado exitosamente', nuevoReporte)
      );
    } catch (error) {
      logger.error('Error al crear reporte:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear reporte')
      );
    }
  },

  // Obtener todos los reportes de un usuario
  async obtenerTodos(req, res) {
    try {
      const reportes = await Report.find({ usuarioId: req.user._id });
      res.json(
        formatResponse(200, 'Reportes obtenidos exitosamente', reportes)
      );
    } catch (error) {
      logger.error('Error al obtener reportes:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener reportes')
      );
    }
  },

  // Obtener un reporte específico por ID
  async obtenerPorId(req, res) {
    try {
      const reporte = await Report.findById(req.params.id);
      if (!reporte) {
        return res.status(404).json(
          formatResponse(404, 'Reporte no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Reporte obtenido exitosamente', reporte)
      );
    } catch (error) {
      logger.error('Error al obtener reporte:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener reporte')
      );
    }
  },

  // Actualizar un reporte específico por ID
  async actualizar(req, res) {
    try {
      const { periodo, actividades } = req.body;
      const reporteActualizado = await Report.findByIdAndUpdate(
        req.params.id,
        { periodo, actividades },
        { new: true, runValidators: true }
      );
      if (!reporteActualizado) {
        return res.status(404).json(
          formatResponse(404, 'Reporte no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Reporte actualizado exitosamente', reporteActualizado)
      );
    } catch (error) {
      logger.error('Error al actualizar reporte:', error);
      res.status(500).json(
        formatResponse(500, 'Error al actualizar reporte')
      );
    }
  },

  // Eliminar un reporte específico por ID
  async eliminar(req, res) {
    try {
      const reporte = await Report.findByIdAndDelete(req.params.id);
      if (!reporte) {
        return res.status(404).json(
          formatResponse(404, 'Reporte no encontrado')
        );
      }
      res.json(
        formatResponse(200, 'Reporte eliminado exitosamente')
      );
    } catch (error) {
      logger.error('Error al eliminar reporte:', error);
      res.status(500).json(
        formatResponse(500, 'Error al eliminar reporte')
      );
    }
  }
};

module.exports = reportController;
