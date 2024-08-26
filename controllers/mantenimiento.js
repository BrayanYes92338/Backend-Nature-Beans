import Mantenimiento from "../models/mantenimientos.js";

const httpMantenimiento = {
  getMantenimiento: async (req, res) => {
    const { buscar } = req.query;
    const mantenimiento = await Mantenimiento.find()
      .populate({
        path: "idMaquinaria",
      })
      .populate({
        path: "responsable",
      });

    res.json({ mantenimiento });
  },
  getMantenimientoActivo:async (req, res)=>{
    const MantenimientoActivo = await Mantenimiento.find({verificacionRealizada:1}) .populate({
      path: "idMaquinaria",
    })
    .populate({
      path: "responsable",
    });
    res.json({MantenimientoActivo})
},
getMantenimientoInactivo: async (req, res)=>{
    const MantenimientoInactivo = await Mantenimiento.find({verificacionRealizada:0}) .populate({
      path: "idMaquinaria",
    })
    .populate({
      path: "responsable",
    });
    res.json({MantenimientoInactivo})
},
  getMantenimientoID: async (req, res) => {
    const { id } = req.params;
    const mantenimiento = await Mantenimiento.findById(id);
    res.json({ mantenimiento });
  },

  postMantenimiento: async (req, res) => {
    try {
      const { idMaquinaria, responsable, observaciones } = req.body;
      const mantenimiento = new Mantenimiento({
        idMaquinaria,
        responsable,
        observaciones,
      });
      await mantenimiento.save();
      res.json({ mantenimiento });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ msg: "Error no se pudo agregar datos de el mantenimiento" });
    }
  },

  putMantenimiento: async (req, res) => {
    const { id } = req.params;
    const { idMaquinaria, ...resto } = req.body;
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(
      id,
      { idMaquinaria, ...resto },
      { new: true }
    );
    res.json({ mantenimiento });
  },
  putMantenimientoActivo: async (req, res) => {
    const { id } = req.params;
    const usuarios = await Mantenimiento.findByIdAndUpdate(
      id,
      { verificacionRealizada: 1 },
      { new: true }
    );
    res.json({ usuarios });
  },
  putMantenimientoInactivo: async (req, res) => {
    const { id } = req.params;
    const usuarios = await Mantenimiento.findByIdAndUpdate(
      id,
      { verificacionRealizada: 0 },
      { new: true }
    );
    res.json({ usuarios });
  },
};
export default httpMantenimiento;
