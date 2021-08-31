// importamos el modelo de usuarios
const Usuario = require('../models/Usuario')

function crearUsuario(req, res) {
  // Instanciaremos un nuevo usuario utilizando la clase usuario
  let usuario = new Usuario(req.body)
  res.status(201).send(usuario)
}

function obtenerUsuarios(req, res) {
  // Simulando dos usuarios y respondiendolos
  const usuario1 = new Usuario(
    1,
    "john",
    "Juan",
    "Vega",
    "juan@vega.com",
    "12345",
    "admin"
  );
  const usuario2 = new Usuario(2,
    "mvega",
    "Monserrat",
    "Vega",
    "mon@vega.com",
    "54321",
    "admin"
  );

  res.send([usuario1, usuario2])
}

function modificarUsuario(req, res) {
  // simulando un usuario previamente existente que el cliente modifica
  let usuario1 = new Usuario(req.params.id, 'Juan', 'Vega', 'juan@vega.com')
  let modificaciones = req.body
  usuario1 = { ...usuario1, ...modificaciones}
  res.send(usuario1)
}

function eliminarUsuario(req, res) {
  // se simula una eliminación de usuario, regresando un 200
  res.status(200).send(`Usuario ${req.params.id} eliminado`);
}

// exportamos las funciones definidas
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario
}