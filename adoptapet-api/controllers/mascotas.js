const moongose = require('mongoose')
const Mascota = moongose.model('Mascota')

function crearMascota(req, res, next) {
  let mascota = new Mascota(req.body);
  mascota.save().then(mas => {
    res.status(200).send(mas)
  }).catch(next)
}

function obtenerMascota(req, res, next){
  if(req.params.id){
    Mascota.findById(req.params.id).then(mascota => {
        res.send(mascota)
      }).catch(next)
  } else {
    Mascota.find().then(mascotas => {
      res.send(mascotas)
    }).catch(next)
  }
}

function modificarMascota(req, res,next){
   Mascota.findById(req.params.id).then(mascota => {
      if (!mascota) { return res.sendStatus(401); }
      let nuevaInfo = req.body
      if (typeof nuevaInfo.nombre !== 'undefined')
        mascota.nombre = nuevaInfo.nombre
      if (typeof nuevaInfo.categoria !== 'undefined')
        mascota.categoria = nuevaInfo.categoria
      if (typeof nuevaInfo.fotos !== 'undefined')
        mascota.fotos = nuevaInfo.fotos
      if (typeof nuevaInfo.descripcion !== 'undefined')
        mascota.descripcion = nuevaInfo.descripcion
      if (typeof nuevaInfo.anunciante !== 'undefined')
        mascota.anunciante = nuevaInfo.anunciante
      if (typeof nuevaInfo.ubicacion !== 'undefined')
        mascota.ubicacion = nuevaInfo.ubicacion
      mascota.save().then(updated => {
        res.status(201).json(updated.publicData())
      }).catch(next)
    }).catch(next)
}


function eliminarMascota(req, res, next){
  Mascota.findOneAndDelete({ _id: req.params.id }).then(r => {
      res.status(200).send(`Mascota ${req.params.id} eliminada: ${r}`);
    })
}


module.exports = {
  crearMascota,
  obtenerMascota,
  modificarMascota,
  eliminarMascota
}


