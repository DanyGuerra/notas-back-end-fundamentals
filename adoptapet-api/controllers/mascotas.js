const Mascota = require('../models/Mascota')
var mascota1 = new Mascota(1, 'Tobi', 'Perro', 'https://petstore/photo-tobi', 'Es muy tranquilo', 'Juan', 'Jalisco')
var mascota2 = new Mascota(2, 'Manchas', 'Gato', 'https://petstore/photo-manchas', 'Es muy jugueton', 'Maria', 'Jalisco')

function crearMascota(req, res) {
  let mascota = new Mascota(req.body);
  res.status(201).send(mascota);
}

function obtenerMascota(req, res) {
    res.send([mascota1, mascota2])
}

function modificarMascota(req, res) {
  let modificaciones = req.body
  mascota1 = { ...usuario1, ...modificaciones}
  res.send(mascota1)
}

function eliminarMascota(req, res) {
  res.status(200).send(`Mascota ${req.params.id} eliminado`);
}

module.exports = {
  crearMascota,
  obtenerMascota,
  modificarMascota,
  eliminarMascota
}
