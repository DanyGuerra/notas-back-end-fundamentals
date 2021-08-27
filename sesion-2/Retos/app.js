//********** Reto 1*/
const express = require('express');
const app = express();
const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const constelaciones = {
  Andromeda : {
    abreviatura : 'And',
    superficie :  722.3,
    num_estrellas : 152,
    estr_mas_brillante : 'Alpheratz'
  },
  Aquila : {
    abreviatura : 'Aql',
    superficie :  652.5,
    num_estrellas : 124,
    estr_mas_brillante : 'Altair'
  },
  Hercules  : {
    abreviatura : 'Her',
    superficie :  1225.1 ,
    num_estrellas : 245,
    estr_mas_brillante : 'Kornephoros'
  },
  Crater  : {
    abreviatura : 'Crt',
    superficie :  282.4 ,
    num_estrellas : 33,
    estr_mas_brillante : 'Labrum'
  },
  Hidra  : {
    abreviatura : 'Hya',
    superficie :  1302.8,
    num_estrellas : 238,
    estr_mas_brillante : 'Alfard'
  }
}

//*****Reto 1 */

// app.get("/constelaciones", (request, response)=>{
//     response.send(constelaciones);
// })

// app.get("/constelaciones/:name", (req, res)=>{
//   let name = req.params.name;
//   let constelacion = constelaciones[name]

//   if(constelacion){
//     res.send(constelacion)
//   }else{
//     res.status(404).send('Constelacion no encontrada');
//   }
// })


//**********REto 2 *****/
const findAttr = (attr)=>{
  for(let constelacion in constelaciones){
    let atributos = constelaciones[constelacion]

    if (constelacion==attr){
      return atributos
    }else{
      for(let property in atributos){
        if (atributos[property]== attr){
          return atributos
        }
      }
    }
  }
}

app.get("/constelaciones/:attr", (req, res)=>{
  let attr = req.params.attr;
  let constelacion = findAttr(attr);

  if(constelacion){
    res.send(constelacion)
  }else{
    res.status(404).send('Constelacion no encontrada');
  }
})
