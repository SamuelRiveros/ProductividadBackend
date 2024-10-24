const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middlewares/auth'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter'); // Middleware de límite de solicitudes


// Rutas públicas
router.post('/',rateLimiter.postLimiter, activityController.crear);
router.post('/iniciarSesion',rateLimiter.loginLimiter, activityController.iniciarSesion);

// Rutas protegidas (requieren autenticación)
router.get('/validarSesion', auth,rateLimiter.getLimiter, activityController.validarSesion);
router.get('/', auth,rateLimiter.getLimiter, activityController.obtenerTodos);
router.get('/:id', auth,rateLimiter.getLimiter, activityController.obtenerPorId);
router.put('/:id', auth,rateLimiter.putLimiter, activityController.actualizar);
router.delete('/:id', auth,rateLimiter.deleteLimiter, activityController.eliminar);

module.exports = router;