const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/CarritoArticles.js');
const articleController = require('../controllers/article.js');

const multer = require('multer');
const path = require('path');

// Configurar Multer para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/uploads/'); // Ajusta la ruta aquí
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
  });
  

const upload = multer({ storage: storage });
// Definir rutas y conectar con los métodos del controlador
router.post('/carrito/compra/:numero/:id',articleController.CompraUser);
router.get('/carrito/mostrar',carritoController.mostrarCarrito);
router.delete('/carrito/vaciar',carritoController.VaciarCarrito);
router.delete('/carrito/eliminar/:id',carritoController.EliminarDelCarrito);
router.post('/carrito/agregar',carritoController.crearCarrito);
router.post('/guardar', upload.single('imagen'), articleController.createUser);
router.get('/mostrar', articleController.getAllUsers);
router.delete('/eliminar/:id',articleController.deleteUser);
router.get('/buscar/:nombre?',articleController.searchUsers);
router.get('/editar/:id',articleController.getOneUser);
router.post('/actualizar/:id',upload.single('imagen'),articleController.UpdateUser);


module.exports = router;
