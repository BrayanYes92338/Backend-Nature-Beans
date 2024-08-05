import Semilla from "../models/semillas.js";

const httpSemillas = {
  getSemillas: async (req, res) => {
    const semilla = await Semilla.find();
    res.json({ semilla });
  },

  getSemillaID: async (req, res) => {
    const { id } = req.params;
    const semilla = await Semilla.findById(id);
    res.json({ semilla });
  },
  getProveedores:async (req, res) => {
    const { idProveedores } = req.params;
    try {
      const semillas = await Semilla.find(idProveedores).populate("idProveedor")

      res.json({semillas});
    } catch (error) {
      console.error("Error al obtener las semillas por responsable:", error);
      res
        .status(500)
        .json({ error: "Error al obtener las semillas por responsable" });
    }
  },
  postSemilla: async (req, res) => {
    try {
      const {
        idProveedor,
        numFactura,
        fechaCompra,
        fechaVencimiento,
        especie,
        variedad,
        NumLote,
        origen,
        poderGerminativo,
      } = req.body;
      const semilla = new Semilla({
        idProveedor,
        numFactura,
        fechaCompra,
        fechaVencimiento,
        especie,
        variedad,
        NumLote,
        origen,
        poderGerminativo,
      });
      await semilla.save();
      res.json({ semilla });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ msg: "Error no se pudo crear el registro de Semillas" });
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
  getSemillaActivo: async (req, res) => {
    try {
      const semillaActivos = await Semilla.find({ estado:1});
      res.json({ semilla: semillaActivos });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener semillas activos" });
    }
  },
  getSemillaInactivo: async (req, res) => {
    try {
      const semillaInactivos = await Semilla.find({estado:0});
      res.json({ semilla: semillaInactivos });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener semillas inactivos" });
    }
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
