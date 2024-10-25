const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middlewares/auth'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter'); // Middleware de límite de solicitudes

router.use(auth);

// Rutas Crud //* (requieren autenticación)
router.post('/', rateLimiter.postLimiter, activityController.crear);
router.get('/', rateLimiter.getLimiter, activityController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, activityController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, activityController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, activityController.eliminar);

module.exports = router;