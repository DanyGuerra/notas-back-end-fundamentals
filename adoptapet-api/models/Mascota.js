// class Mascota {
//   constructor(id, nombre, categoria, fotos, descripcion, anunciante, ubicacion) {
//     this.id = id;
//     this.nombre = nombre; // nombre de la mascota (o titulo del anuncio)
//     this.categoria = categoria; // perro | gato | otro
//     this.fotos = fotos; // links a las fotografías
//     this.descripcion = descripcion; // descripción del anuncio
//     this.anunciante = anunciante; // contacto con la persona que anuncia al animalito
//     this.ubicacion = ubicacion; // muy importante
//   }

// }

// module.exports = Mascota;

const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    enum: ['Perro', 'Gato', 'Otro']
  },
  fotos: String,
  descripcion:{
    type: String,
    required: true
  },
  anunciante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  ubicacion: String

}, {collection: "Mascotas", timestamps: true});// Nombre de la coleccion como esta en Mongo



MascotaSchema.methods.publicData = () => {
  return {
    id: this.id,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    descripcion: this.descripcion,
    anunciante: this.anunciante,
    ubicacion: this.ubicacion
  }
}

mongoose.model("Mascota", MascotaSchema);