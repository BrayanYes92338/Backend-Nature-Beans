import Semilla from "../models/semillas.js";
import Inventario from "../models/inventarios.js";

const httpSemillas = {
  getSemillas: async (req, res) => {
    const semilla = await Semilla.find()
    .populate({
      path: 'idProveedor'
  });
    res.json({ semilla });
  },
  
  getSemillaActiva: async (req, res) => {
    try {
      const semillaActiva = await Semilla.find({ estado: 1 });
      res.json({ semilla: semillaActiva });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener semilla activa' });
    }
  },
  geSemillaInactiva: async (req, res) => {
    try {
      const semillaInactiva = await Semilla.find({ estado: 0 });
      res.json({ semilla: semillaInactiva });

    } catch (error) {
      res.status(500).json({ error: 'Error al obtener semilla inactiva' });
    }
  },

  getSemillaID: async (req, res) => {
    const { id } = req.params;
    const semilla = await Semilla.findById(id);
    res.json({ semilla });
  },
  getProveedores:async (req, res) => { 
    const { idProveedores } = req.params;
    try {
      const semilla = await Semilla.find(idProveedores).populate("idProveedor")

      res.json({semilla});
    } catch (error) {
      console.error("Error al obtener las semillas por responsable:", error);
      res
        .status(500)
        .json({ error: "Error al obtener las semillas por responsable" });
    }
  },
  postSemilla: async (req, res) => {
    try {
      const {idProveedor,numFactura,fechaCompra,fechaVencimiento,especie,variedad,NumLote,origen,poderGerminativo,total} = req.body;
      const semilla = new Semilla({idProveedor,numFactura,fechaCompra,fechaVencimiento,especie,variedad,NumLote,origen,poderGerminativo,total});

      await semilla.save();

      const invent = new Inventario({idSemilla: semilla._id, total: semilla.total})
      await invent.save() 
      res.json({ semilla });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el registro de Semillas" });
    }
  },
  putSemilla: async (req, res) => {
    const { id } = req.params;
    const { idProveedor, ...resto } = req.body;
    const semilla = await Semilla.findByIdAndUpdate(
      id,
      { idProveedor, ...resto },
      { new: true }
    );
    res.json({ semilla });
  },
 
  putSemillaActiva: async (req, res) => {
    const { id } = req.params;
    const semilla = await Semilla.findByIdAndUpdate(
      id, 
      { estado: 1 },
      { new: true }
    );
    res.json({ semilla }); 
  },
  putSemillaDesactivar: async (req, res) => {
    const { id } = req.params;
    const semilla = await Semilla.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );
    res.json({ semilla });
  },
};

export default httpSemillas;
