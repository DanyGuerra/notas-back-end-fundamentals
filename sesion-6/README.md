# Sesión 6: Mongoose

## ¿Cómo conectar el backend con mi base de datos?

Para abstraer entidades (Modelos) y facilitar el trabajo de los programadores, la comunidad de desarrolladores han desarrollado herramientas que proveen una manera más eficiente de interactuar con las bases de datos.

Es muy común que cuando quieras comenzar a trabajar con alguna de las bases de datos existentes en tu lenguaje de programación favorito al buscar la manera de hacerlo te encuentres con librerías existentes para trabajar con la base de datos de tu preferencia.

Estas librerías, también conocidas como clientes las puedes encontrar directamente en el sitio oficial de la BD que elijas.

Para trabajar con el patrón MVC es muy recomendable trabajar con librerías que mapean las clases de nuestro lenguaje de programación si estamos trabajando con un lenguaje orientado a objetos, estas librerías son conocidas como ORM o ODM.

## ORM (Object Relational Mapping)

Es una técnica de programación que permite la relación de los objetos con los datos que ellos mismos representan.

El ORM contiene herramientas que permiten la conversión de objetos para ser almacenados en una base de datos relacional.

Por ejemplo, si queremos trabajar con Node.js y una base de datos SQL podemos utilizar [Sequelize](https://sequelize.org/v5/).


## ORM (Object Document Mapping)

Un ODM (Object Document Mapping) es una herramienta para trabajar con objetos en bases de datos orientadas a documentos cómo MongoDB y los datos que estos objetos representan. Para Javascript, el más popular de ellos es [Mongoose](https://mongoosejs.com/).

## ¿Por qué esto es importante?

Si trabajamos haciendo peticiones directamente al servidor de bases de datos, implicaría realizar mucho código adicional para manejar todas las conversiones de datos a sus representaciones necesarias para ser comunicados por medio de una API. También trabajar con servidores de datos implica hacer muchas validaciones, correr pruebas y considerar la seguridad de la misma. Al utilizar una librería probada y mantenida por la comunidad, podremos ahorrarnos este trabajo y poder utilizar el tiempo restante en crear una aplicación más estable y con características de valor para el usuario final.

## Mongoose

### Codigo `app.js`

```javascript
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion de la base de datos
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://danyguerra:MN0630one@cluster0.tf5ep.mongodb.net/Adoptapet?retryWrites=true&w=majority')

mongoose.set("debug", true);

require('./models/Usuario')
require('./models/Mascota')
require('./models/Solicitud')

// Rutas
app.use('/v1', require('./routes/index'))

// Iniciando el servidor
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

```

### Codigo modelo `Mascota.js`
```javascript
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
  foto: String,
  descripcion:{
    type: String,
    required: true
  },
  anunciante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  ubicacion: String

}, {collection: "Mascotas", timestamps: true});


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
```


### Codigo controlador `mascotas.js`
```javascript
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

```