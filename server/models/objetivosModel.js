const mongoose = require('mongoose');

const objetivoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título del objetivo es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  fechaEstablecida: {
    type: Date,
    required: [true, 'La fecha establecida es requerida']
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Objetivo', objetivoSchema);
