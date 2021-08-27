const express = require('express');
const app = express();

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const gods = [
  { name: 'Zeus' },
  { name: 'Hades' },
  { name: 'Hermes' }
];

app.get('/gods', (req, res, next) => {
  res.send(gods);
});
