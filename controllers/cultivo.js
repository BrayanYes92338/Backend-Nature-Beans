import Cultivo from "../models/cultivo.js";

const httpCultivo = {
//   getCultivo: async (req, res) => {
//     const { buscar } = req.query;
//     const cultivo = await Cultivo.find({
//       $or: [{}],
//     });
//     res.json({});
//   },
  getCultivo: async (req, res) => {
    const cultivo = await Cultivo.find();
    res.json({ cultivo });
  },
  getCultivoID: async (req, res) => {
    const { id } = req.params;
    const cultivo = await Cultivo.findById(id);
    res.json({ cultivo });
  },
  getCultivoActivo: async (req, res) => {
    try {
      const cultivoActivos = await Cultivo.find({ estado: 1 });
      res.json({ cultivo: cultivoActivos });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener cultivos activos' });
    }
  },
  getCultivoInactivo: async (req, res) => {
    try {
      const cultivoInactivos = await Cultivo.find({ estado: 0 });
      res.json({ cultivo: cultivoInactivos });

    } catch (error) {
      res.status(500).json({ error: 'Error al obtener Cultivos inactivos' });
    }
  },
  postCultivo: async (req, res) => {
    try {
      const {
        Nombre,
        tipo,
        idParcela
      } = req.body;

      const cultivo = new Cultivo({
        Nombre,
        tipo,
        idParcela
      });

      await cultivo.save();
      res.json({ cultivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el Cultivo" });
    }
  },
  putCultivo: async (req, res) => {
    const { _id } = req.params;
    const { nombre, ...resto } = req.body;
    const cultivo = await Cultivo.findByIdAndUpdate(
      _id,
      { nombre, ...resto },
      { new: true }
    );
    res.json({ cultivo });
  },
  putCultivoaActivar: async (req, res) => {
    const { id } = req.params;
    const cultivo = await Cultivo.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );
    res.json({ cultivo });
  },
  putCultivoDesactivar: async (req, res) => {
    const { id } = req.params;
    const cultivo = await Cultivo.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );
    res.json({ cultivo });
  }
 
  
};

export default httpCultivo;
