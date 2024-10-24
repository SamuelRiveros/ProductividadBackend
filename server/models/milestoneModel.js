const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: [true, 'La descripción del hito es requerida'],
    trim: true
  },
  objetivo: {
    type: String,
    required: [true, 'El objetivo del hito es requerido'],
    trim: true
  },
  fechaEstablecida: {
    type: Date,
    required: [true, 'La fecha establecida es requerida']
  },
  fechaCumplimiento: {
    type: Date
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  logrado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Milestone', milestoneSchema);
