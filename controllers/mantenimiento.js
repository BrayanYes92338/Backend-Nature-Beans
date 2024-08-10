import Mantenimiento from "../models/mantenimientos.js";



const httpMantenimiento = {
  getMantenimiento: async (req, res) => {
    const { buscar } = req.query;
    const mantenimiento = await Mantenimiento.find()
    
    res.json({ mantenimiento });
  },


  getMantenimientoID: async (req, res) => {
    const { id } = req.params;
    const mantenimiento = await Mantenimiento.findById(id);
    res.json({ mantenimiento });
  },

  postMantenimiento: async (req, res) => {
    try {
      const  {
        idMaquinaria,
        responsable,
        observaciones}= req.body;
      const mantenimiento = new Mantenimiento({ idMaquinaria,
        responsable,
        observaciones})
      await mantenimiento.save()
      res.json({ mantenimiento })
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: 'Error no se pudo agregar datos de el mantenimiento' })
    }
  },

  putMantenimiento: async (req, res) => {
    const { id } = req.params;
    const { idMaquinaria, ...resto } = req.body;
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { idMaquinaria, ...resto }, { new: true })
    res.json({ mantenimiento })
  },


}
export default httpMantenimiento