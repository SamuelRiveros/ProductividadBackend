const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas (requieren autenticación)
router.post('/', auth, rateLimiter.postLimiter, reportController.crear);
router.get('/', auth, rateLimiter.getLimiter, reportController.obtenerTodos);
router.get('/:id', auth, rateLimiter.getLimiter, reportController.obtenerPorId);
router.put('/:id', auth, rateLimiter.putLimiter, reportController.actualizar);
router.delete('/:id', auth, rateLimiter.deleteLimiter, reportController.eliminar);

module.exports = router;
