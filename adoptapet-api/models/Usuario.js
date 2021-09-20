// class Usuario {
//   constructor(id, username, nombre, apellido, email, password, tipo) {
//     this.id = id;
//     this.username = username;
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.email = email;
//     this.password = password;
//     this.tipo = tipo; // tipo normal o anunciante
//   }
// }
// module.exports = Usuario;


// Usuario.js
const mongoose = require('mongoose');                         //Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator,

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;


//Definiendo cada campo con sus tipos de dato y las validaciones sobre este.
const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //este campo no se puede repetir
    lowercase: true,
    required: [true, "No puede estar vacío el nombre de usuario"],
    match: [/^[a-zA-Z0-9]+$/, "UserName inválido"],
    index: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true, //este campo no se puede repetir
    lowercase: true,
    required: [true, "Falta Email"],
    match: [/\S+@\S+\.\S+/, "Email inválido"],
    index: true //debido a que se hacen muchas consultas a email se indexa para acceso mas rapido. Es para consultas mas rapidas
    //El ID que genera mongo siempre esta indexado
  },
  ubicacion: String,
  telefono: String,
  bio: String,
  foto: String,
  tipo: {
    type: String,
    enum: ['normal', 'anunciante']
  },

  //password se sustituye por estos dos valores los cuales cifraran la contrasena
  hash: String, //Contrasena cifrada
  salt: String //Semilla de cifrado

},{ timestamps: true, collection: "Usuarios",}
);


UsuarioSchema.methods.publicData = () => {
  return {
    id: this.id,
    username: this.username,
    apellido: this.apellido,
    nombre: this.nombre,
    email: this.email,
    tipo: this.tipo
  }
}

UsuarioSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario. (Semilla algoritmo de cifrado)
  this.hash = crypto
  .pbkdf2Sync(password, this.salt, 10000, 512, "sha512") //Funcion de cifrado 10000 iteraciones, longitud de 512 caracteres, y algoritmo de cifrado sha512
  .toString("hex"); // generando un hash utilizando la salt
};

UsuarioSchema.methods.validarPassword = function (password) {
  const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === newHash;
};

UsuarioSchema.methods.generarJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generarJWT()
  };
};

/**Devuelve la representación de un usuario, sólo datos públicos*/
UsuarioSchema.methods.publicData = function(){
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido,
    bio: this.bio,
    foto: this.foto,
    tipo: this.tipo,
    ubicacion: this.ubicacion,
    telefono: this.telefono,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};



// usando plugin de validación para que no se repitan correos ni usernames
UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" });
mongoose.model("Usuario", UsuarioSchema);    //Define el modelo Usuario, utilizando el esquema UsuarioSchema.

