const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true }, // Nuevo campo para la imagen
});

module.exports = mongoose.model('User', userSchema);
