# Sesión 8: Deploy
[Link del deploy](https://adoptapet-dani.herokuapp.com/v1)

# Variables de entorno
Se usan para poder crear variables que se encuentren alojadas en nuestra computadora o en el servidor, esto con el fin de proteger informacion sensible, en este caso el link de conexion a nuestra base de datos.

Creamos un archivo llamado `env.sh` en el directorio `config` y agregamos lo siguiente.

Nota: agregar en el archivo `.gitignore` el archivo `env.sh` .

```javascript
export NODE_ENV='development';
export PORT=4001;
export SECRET='secret';
export MONGO_URI='mongodb+srv://<username>:<password>@cluster0.tf5ep.mongodb.net/<NombreBaseDatos>?retryWrites=true&w=majority';
```

Para cargar las variables ejecutamos el script posicionandonos en la ruta del archivo `env.sh` y ejecutamos el comando:

``` bash
source ./env.sh
```

Modificamos el archivo de `app.js` modificando lo siguiente.

```javascript
mongoose.connect(
  process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
```

Verificar que en el archivo `config/index.js` este el siguiente codigo.

```javascript
module.exports = {
  secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "secret",
};
```

Una vez realizado esto corremos la aplicacion con `npm run dev` y verificamos que todo este de manera correcta.