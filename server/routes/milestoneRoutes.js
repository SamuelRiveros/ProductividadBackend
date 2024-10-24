const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas (requieren autenticación)
router.post('/', auth, rateLimiter.postLimiter, milestoneController.crear);
router.get('/', auth, rateLimiter.getLimiter, milestoneController.obtenerTodos);
router.get('/:id', auth, rateLimiter.getLimiter, milestoneController.obtenerPorId);
router.put('/:id', auth, rateLimiter.putLimiter, milestoneController.actualizar);
router.delete('/:id', auth, rateLimiter.deleteLimiter, milestoneController.eliminar);

module.exports = router;