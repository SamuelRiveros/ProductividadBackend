const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  mensaje: {
    type: String,
    required: [true, 'El mensaje del recordatorio es requerido'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha del recordatorio es requerida']
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actividadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity' // Relación opcional con actividades
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);
