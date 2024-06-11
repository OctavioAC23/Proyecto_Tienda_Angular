const User = require('../models/User'); // Asegúrate de que la ruta sea la correcta según la ubicación del archivo User.js

const articleController = {
  createUser: async (req, res) => {
    const { nombre, descripcion, cantidad, precio } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : '';

    const newUser = new User({
      nombre,
      descripcion,
      cantidad,
      precio,
      imagen
    });

    newUser.save()
      .then(user => res.json(user))
      .catch(err => res.status(400).json({ error: err.message }));
  },

  UpdateUser: async (req, res) => {
    var articleId = req.params.id;
    const { nombre, descripcion, cantidad, precio } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : undefined; // Usar undefined en lugar de ''

    try {
      // Construir un objeto con los campos a actualizar
      const updateData = {
        nombre,
        descripcion,
        cantidad,
        precio
      };

      // Solo agregar imagen si está presente en la solicitud
      if (imagen) {
        updateData.imagen = imagen;
      }

      // Usar findByIdAndUpdate para buscar y actualizar el usuario por su ID
      const user = await User.findByIdAndUpdate(articleId, updateData, { new: true }).exec();

      // Verificar si el usuario fue encontrado y actualizado
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getOneUser: async (req, res) => {
    var articleId = req.params.id;
    try {
      const users = await User.findById(articleId).exec();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  searchUsers: async (req, res) => {
    var articleNombre = req.params.nombre;
    try {
      const users = await User.find({ nombre: { $regex: '^' + articleNombre, $options: 'i' } }).exec();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    var articleId = req.params.id;

    try {
      // Buscar el artículo por su id utilizando findOne y exec()
      const users = await User.findByIdAndDelete({ _id: articleId }).exec();

      // Si no se encuentra el artículo, devolver un error 404
      if (!users) {
        return res.status(404).send({
          status: 'error',
          message: 'No existe el artículo'
        });
      }

      // Devolver el artículo en formato JSON
      return res.status(200).send({
        status: 'success',
        users
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Error al buscar el artículo'
      });
    }
  },

  CompraUser: async (req, res) => {
    const articleId = req.params.id;
    const cantidad = parseInt(req.params.numero); // Asegúrate de que 'cantidad' sea un número

    try {
      // Encuentra el artículo por su ID
      const user = await User.findById(articleId).exec();

      if (!user) {
        return res.status(404).send({
          status: 'error',
          message: 'No existe el artículo'
        });
      }

      // Reduce la cantidad
      user.cantidad -= cantidad;

      // Verifica si la cantidad disponible es suficiente
      if (user.cantidad == 0) {
        const users = await User.findByIdAndDelete({ _id: articleId }).exec();
      }else{
        // Guarda el cambio en la base de datos
        await user.save();
      }      

      return res.status(200).send({
        status: 'success',
        user
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Error al procesar la compra'
      });
    }
  }
};

module.exports = articleController;
