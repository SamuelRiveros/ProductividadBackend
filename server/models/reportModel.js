const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  periodo: {
    type: String,
    required: [true, 'El periodo del reporte es requerido'],
    enum: ['diario', 'semanal', 'mensual'],
  },
  actividades: [{
    actividadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity',
      required: true
    },
    tiempoDedicado: {
      type: Number, // En minutos
      required: true
    },
    completado: {
      type: Boolean,
      default: false
    }
  }],
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
