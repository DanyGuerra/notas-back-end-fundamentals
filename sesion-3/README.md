# Sesión 3: Creando una API

## Modelo vista controlador (MVC)
El modelo vista controlador es un patrón de diseño de aplicaciones muy útil para modularizar los componentes de una aplicación (Frontend, middleware y backend) haciendo a cada uno independiente del resto para simplificar el desarrollo autónomo de cada uno.

- **Modelo:** Contiene una representación de los datos que maneja el sistema, su lógica de negocio, y sus mecanismos de persistencia.
- **Vista:** Compone y presenta la información que se envía al cliente y los mecanismos interacción con éste por medio de una interfaz de usuario.
- **Controlador:** Actúa como un intermediario entre el Modelo y la Vista, gestionando el flujo de información entre ellos y las transformaciones para adaptar los datos a las necesidades de cada uno.

Actualmente existen varios frameworks que han adaptado este estilo a su manera y que nos ayudan a no perder tiempo y comenzar a desarrollar con reglas preestablecidas. Algunos de estos frameworks son:

- SailJS o Express para NodeJS.
- Django si lo tuyo es Python.
- Ruby on Rails para el lenguaje de - programación Ruby.
- Laravel si lo tuyo es PHP.

Para utilizar MVC en nuestro programa lo haremos de la siguiente manera.

# 1. Modelo: Utilizando Programación Orientada a Objetos

Continuando con AdoptaPet, podemos identificar cuatro entidades principales:

- Mascota: Se refiere al animalito que los administradores registran y que los usuarios pueden adoptar.

- Usuario: hay dos tipos de usuarios de nuestra aplicación, el tipo normal que busca adoptar una mascota y el tipo anunciante que puede ser el cuidador de la mascota o del centro de adopción. Se encarga de registrar a las mascotas y de contactarse con los usuarios cuando estos envían una solicitud, así como de aprobarla y rechazarla.

- Solicitud: Una solicitud puede ser creada por un usuario para ponerse en contacto con el administrador y adoptar a una mascota.

Estos tres elementos serán nuestros modelos. Utilizando programación orientada a objetos podemos crear una clase para cada uno y así posteriormente el usuario podrá utilizar estos modelos creando instancias y obteniéndolas.

# 2. Vista

Cuando iniciamos un proyecto desde cero, es recomendable diseñar y documentar nuestras vistas por medio de bocetos de las interfaces necesarias para un primer prototipo ([Wireframes](https://www.lucidchart.com/pages/es/que-es-un-wireframe-para-un-sitio-web)). Este tarea es común que sea encomendada a el equipo de desarrollo y diseño en conjunto, si es que se cuenta con uno.



# 3. Controlador
El controlador establece la comunicación entre el cliente y nuestro servidor. Aquí es común encontrarnos con el patrón CRUD para permitirle al cliente realizar operaciones básicas con nuestros modelos. Estas operaciones son:

C - Create (crear)

R - Read (leer)

U - Update (actualizar)

D - Delete (eliminar)

Para la finalidad de este curso asumiremos que AdoptaPet contará con una arquitectura cliente-servidor y con equipos independientes de frontend y backend. Para que el sistema que desarrolle frontend se comunique con nuestro backend crearemos una "interfaz" o API en la siguiente sesión.


# Modularizar el proyecto para seguir el MVC.

Teniendo la estructura de archivos del proyecto siguiente, se modularizara el proyecto para seguir MVC.

[Estructura del proyecto](../adoptapet-api)
```
adoptapet-api/
    ├── config/
    ├── models/
        ├──Mascota.js
        ├──Solicitud.js
        ├──Usuario.js
    ├── controllers/
        ├──mascotas.js
        ├──usuarios.js
        ├──solicitudes.js
    ├── routes/
        ├──index.js
        ├──mascotas.js
        ├──usuarios.js
        ├──solicitudes.js
    ├── app.js
```

En el directorio raíz tenemos el archivo principal llamado `app.js`. En este archivo estamos definiendo que una vez que se tenga la direccion del servidor con `/v1` (version numero 1 de nuestra API) nos dirigiremos al directorio `routes/` y por defecto este se dirigira al archivo principal llamado `index.js`.

**Codigo de `app.js`**
```javascript
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1', require('./routes'))

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## Models

Estos tres elementos (usuarios, mascotas y solicitudes) serán nuestros modelos. Utilizando programación orientada a objetos podemos crear una clase para cada uno y así posteriormente el usuario podrá utilizar estos modelos creando instancias y obteniéndolas.

Para esto en la carpeta [`models`](./../adoptapet-api/models) se crearan 3 archivos en los cuales se crea una clase la cual sera exportada para poder crear instancias y obtenerlas.
A continuacion se muestra el codigo de cada archivo.

```javascript
// Mascota.js

/** Clase que representa un animalito a adoptar */
class Mascota{
  constructor(nombre, categoria, fotos, descripcion, anunciante, ubicacion){
    this.nombre = nombre; // nombre de la mascota (o titulo del anuncio)
    this.categoria = categoria; // perro | gato | otro
    this.fotos = fotos; // links a las fotografías
    this.descripcion = descripcion; // descripción del anuncio
    this.anunciante = anunciante; // contacto con la persona que anuncia al animalito
    this.ubicacion = ubicacion; // muy importante
  }

  guardar(){
    // función para guardar un nuevo registro en la base de datos.
  }

}

```

```javascript
// Usuario.js
/** Clase que representa a un usuario de la plataforma*/
class Usuario {
  constructor(id, username, nombre, apellido, email, password, tipo) {
    this.id = id;
    this.username = username;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.tipo = tipo; // tipo normal o anunciante
  }
}
module.exports = Usuario;

```

```javascript
// Solicitud.js
/** Clase que representa una solicitud de adopción */
class Solicitud {
  constructor(id, idMascota, fechaDeCreacion, idUsuarioAnunciante, idUsuarioSolicitante, estado) {
    this.id = id;
    this.idMascota = idMascota;
    this.fechaDeCreacion = fechaDeCreacion;
    this.idUsuarioAnunciante = idUsuarioAnunciante;
    this.idUsuarioSolicitante = idUsuarioSolicitante;
    this.estado = estado;
  }

}

module.exports = Solicitud;

```



## Routes

Al siguiente archivo al que se dirige la aplicacion es `routes/index.js`. En este archivo estamos definiendo mini aplicaciones de express llamadas Router. Una vez que se definen estas mini aplicaciones estamos definiendo que se usara dependiendo la ruta que se asigna en este caso estamos definiendo que cuando se tenga la direccion `/v1/usuarios` o `/v1/mascotas` se estara usando el modulo que se exporto en el correspondiente archivo que se encuentra en la carpeta `/controllers/mascotas.js` o `/controllers/usuarios.js`

**Codigo de `index.js`**
```javascript
let router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('Welcome to adoptpet');
})

router.use('/usuarios', require('./usuarios'));
router.use('/mascotas', require('./mascotas'));

module.exports = router;
```

## Controladores

Los siguientes archivos los cuales estra usando seran los archivos de la carpeta de `/controllers` en estos archivos se estan definiendo los servicios correspondientes a cada una de las entidades. En estos codigos se esta definiendo los servicios CRUD que se estaran usando para cada una de las entidades.

**Codigo de los archivos de controladores `/controllers/mascotas.js` y `/controllers/usuarios.js`**

```javascript
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

```

```javascript
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
```

## Conclusiones
De esta manera modularizando nuestra aplicación se tiene el proyecto mas organizado de una manera esquematizada y si por alguna razon llega haber algún tipo de error en nuestro codigo es mas facil solucionarlo, de igual manera es mejor el entendimiento del funcionamiento del proyecto y sera mejor el mantenimiento de la misma.