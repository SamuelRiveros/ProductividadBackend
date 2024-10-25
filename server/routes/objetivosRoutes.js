const express = require('express');
const router = express.Router();
const objetivosController = require('../controllers/objetivosController');
const auth = require('../middlewares/auth'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter'); // Middleware de límite de solicitudes

router.use(auth);

//Rutas CRUD
router.post('/', rateLimiter.postLimiter, objetivosController.crear);
router.get('/', rateLimiter.getLimiter, objetivosController.obtenerTodos);
router.get('/:id', rateLimiter.getLimiter, objetivosController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, objetivosController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, objetivosController.eliminar);

module.exports = router;
