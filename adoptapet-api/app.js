const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion de la base de datos
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://danyguerra:adoptapetAPI@cluster0.tf5ep.mongodb.net/Adoptapet?retryWrites=true&w=majority')

mongoose.set("debug", true);

require('./models/Usuario')
require('./models/Mascota')
require('./models/Solicitud')

// Al final se importa passport ya que se usan los modelos en la configuracion de passport
require('./config/passport');

// Rutas
app.use('/v1', require('./routes/index'))

// Iniciando el servidor
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

