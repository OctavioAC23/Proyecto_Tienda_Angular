const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

// MongoDB configuration
const dbURI = 'mongodb://localhost:27017/TiendaLinea'; // Cambia esta URI si tu configuración de MongoDB es diferente
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log('Servidor corriendo en http://localhost:' + port);
    });
  })
  .catch(err => console.log(err));

module.exports = mongoose;
