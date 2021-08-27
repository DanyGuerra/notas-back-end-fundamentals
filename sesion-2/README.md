# Sesión 2 - Middleware API

En esencia, el middleware es la conexión que existe entre el lado del cliente (la interfaz de usuarix) y el lado del servidor (el servidor y la base de datos). Pensemos en el middleware como la plomería de una casa que se encarga de llevar todos los recursos (Agua, gas, electricidad, etc.) a las personas que la habitan.

El middleware debe proveer una interfaz de comunicación que se adapte tanto a las necesidades del cliente como las del servidor por lo que debe ser muy flexible.

## Instalación de ExpressJS

Para comenzar debemos tener esta estructura de directorios en nuestro proyecto:

nombre-proyecto/

├── config/

├── models/

├── controllers/

├── routes/

├── app.js

En la carpeta raíz iniciamos un nuevo proyecto con el comando

`npm init -y`

Instalamos Express con el comando

