const router = require('express').Router();

const {
  crearMascota,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
  contador
} = require('../controllers/mascotas');


// Definir la mas particular arriba. De mas especifico a lo mas general. exepto '/'
// http://localhost:4001/v1/mascotas/count/Otro
// http://localhost:4001/v1/mascotas/61302146dd93d97f386d7c02

router.get('/', obtenerMascota)
router.get('/count/:cat', contador);
router.get('/:id', obtenerMascota)

router.post('/', crearMascota)
router.put('/:id', modificarMascota)
router.delete('/:id', eliminarMascota)

module.exports = router;


