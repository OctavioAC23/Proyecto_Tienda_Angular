const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const path = require('path');

const app = express();

app.use(cors()); // Usa el middleware cors para habilitar las cabeceras CORS

// Middleware para analizar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar y usar las rutas
const routes = require('./routes/routes');
app.use('/api', routes);

module.exports = app;
