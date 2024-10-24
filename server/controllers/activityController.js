const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
const { formatResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const activityController = {

    async crearActividad(req, res) {
        try {
            const { tipo, nombre, descripción, prioridad, fecha, duracion } = req.body

            const actividadSchema = new Actividad({
                tipo,
                nombre,
                descripción,
                prioridad,
                fecha,
                duracion
            })

            await actividadSchema.save()

            res.status(201).json(
                formatResponse(201, 'Usuario creado exitosamente', usuarioResponse)
            );
        } catch(error) {
            console.log("Error al crear actividad")
            res.status(500).json(
                formatResponse(500, 'Error al crear usuario')
            );
        }
    },

    async categoriaActividad(req, res) {
        try {

        }catch(error) {

        }
    }
}