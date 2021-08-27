// const express = require('express');
// const app = express();

// const PORT = 4001;
// app.listen(PORT, () => {
//     console.log(`IServer listening on port ${PORT}`)
// })

// const gods = [
//   { name: 'Zeus' },
//   { name: 'Hades' },
//   { name: 'Hermes' }
// ];

// //Como reacciona cuando llega en get (servicio), en la subdireccion gods
// // y que respuesta da con la solicitud que llega
// // el request es como el ejemplo del json para obtener cierta mascota

// app.get("/gods", (request, response)=>{
//     response.send(gods);
// })

// //Este es la ruta http://localhost:4001/gods que se usa en insomnia



const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const gods = {
  Zeus: { live: 'Olympus', symbol: 'Thunderbolt' },
  Hades : { live : 'Underworld', symbol: 'Cornucopia' }
};

app.get("/gods", (request, response)=>{
    response.send(gods);
})

app.get('/gods/:name', (req, res)=>{
  let name = req.params.name;
  let god = gods[name]

  if(god){
    res.send(god)
  }else{
    res.status(404).send('Good Not Found');
  }
})


// req = {
//   params: {
//     id: 6,
//     name: 'Zeus'
//   }
// }


app.put('/gods/:name', (req, res)=>{
  let god = req.params.name;
  gods[god] = req.body;
  res.send(gods);
})

app.post('/gods', (req, res)=>{
  let name = req.query.name;
  let info = req.body;
  gods[name] = info;
  res.status(200).send(gods);
})

