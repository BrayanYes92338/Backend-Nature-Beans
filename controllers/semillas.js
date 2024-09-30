import Semilla from "../models/semillas.js";
const httpSemillas = {
  getSemillas: async (req, res) => {
    const semilla = await Semilla.find().populate({
      path: 'idFinca'
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
  getSemillasProveedores:async (req, res) => { 
    const { idFinca } = req.params;
    try {
      const semilla = await Semilla.find(idFinca).populate("idFinca")

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
      const {idFinca,registro_ICA,registro_Invima,fechaVencimiento,especie,numLote,origen,poderGerminativo} = req.body;
      const semilla = new Semilla({idFinca,registro_ICA,registro_Invima,fechaVencimiento,especie,numLote,origen,poderGerminativo});

      await semilla.save(); 
      res.json({ semilla });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el registro de Semillas" });
    }
  },
  putSemilla: async (req, res) => {
    const { id } = req.params;
    const { idFinca, ...resto } = req.body;
    const semilla = await Semilla.findByIdAndUpdate(
      id,
      { idFinca, ...resto },
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
