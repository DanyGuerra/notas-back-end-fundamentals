let router = require('express').Router()

let {
  crearSolicitud,
  obtenerSolicitud,
  modificarSolicitud,
  eliminarSolicitud,
  count
} = require('../controllers/solicitudes');

router.get('/', obtenerSolicitud);
router.get('/count/:id', count);
router.post('/', crearSolicitud);
router.put('/:id', modificarSolicitud);
router.delete('/:id', eliminarSolicitud);

module.exports = router;
