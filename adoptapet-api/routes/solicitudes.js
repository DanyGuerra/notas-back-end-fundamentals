let router = require('express').Router()

let {
  crearSolicitud,
  obtenerSolicitud,
  modificarSolicitud,
  eliminarSolicitud
} = require('../controllers/solicitudes');

router.get('/', obtenerSolicitud);
router.post('/', crearSolicitud);
router.put('/:id', modificarSolicitud);
router.delete('/:id', eliminarSolicitud);

module.exports = router;
