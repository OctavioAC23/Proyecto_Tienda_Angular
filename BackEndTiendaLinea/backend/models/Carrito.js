const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  _id:{type:String,required:true},
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  maxCantidad: {type:Number, default:1}
});

module.exports = mongoose.model('Carrito', carritoSchema, 'Carrito');
