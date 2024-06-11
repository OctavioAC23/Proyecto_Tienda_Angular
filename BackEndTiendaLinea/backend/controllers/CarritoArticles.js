const Carrito = require('../models/Carrito');

const CarritoController = {
    crearCarrito: async (req, res) => {
        const { _id, nombre, descripcion, cantidad, precio, imagen } = req.body;
        const carritoItem = new Carrito({
            _id,
            nombre,
            descripcion,
            cantidad,
            precio,
            imagen
        });
        carritoItem.save().then(Carrito => res.json(Carrito)).catch(err => res.status(400).json({ error: err.message }));
    },
    mostrarCarrito: async (req, res) => {
        try {
            const items = await Carrito.find();
            res.json(items);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    EliminarDelCarrito: async (req, res) => {
        var CarritoId = req.params.id;
        try {
            // Buscar el artículo por su id utilizando findOne y exec()
            const carritos = await Carrito.findByIdAndDelete({ _id: CarritoId }).exec();
      
            // Si no se encuentra el artículo, devolver un error 404
            if (!carritos) {
              return res.status(404).send({
                status: 'error',
                message: 'No existe el carrito'
              });
            }
      
            // Devolver el artículo en formato JSON
            return res.status(200).send({
              status: 'success',
              carritos
            });
          } catch (error) {
            return res.status(500).send({
              status: 'error',
              message: 'Error al buscar el artículo'
            });
          }
    },
    VaciarCarrito: async(req,res)=>{
      try{
        const items = await Carrito.deleteMany();
        res.json(items);
      }catch (err) {
        res.status(400).json({ error: err.message });
    }
    }
};

module.exports = CarritoController;
