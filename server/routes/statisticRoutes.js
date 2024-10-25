const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD
router.post('/', rateLimiter.postLimiter, estadisticasController.crear);
router.get('/', rateLimiter.getLimiter, estadisticasController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, estadisticasController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, estadisticasController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, estadisticasController.eliminar);

module.exports = router;