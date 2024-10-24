const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas //* (requieren autenticación)
router.post('/', auth, rateLimiter.postLimiter, reminderController.crear);
router.get('/', auth, rateLimiter.getLimiter, reminderController.obtenerTodos);
router.get('/:id', auth, rateLimiter.getLimiter, reminderController.obtenerPorId);
router.put('/:id', auth, rateLimiter.putLimiter, reminderController.actualizar);
router.delete('/:id', auth, rateLimiter.deleteLimiter, reminderController.eliminar);

module.exports = router;