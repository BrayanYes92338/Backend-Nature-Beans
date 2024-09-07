import Insumo from "../models/insumos.js";
import Inventario from "../models/inventarios.js";


const httpInsumo = {
  getInsumo: async (req, res) => {
    const insumo = await Insumo.find()
    res.json({ insumo });
  },


  getInsumoID: async (req, res) => {
    const { id } = req.params;
    const insumo = await Insumo.findById(id);
    res.json({ insumo });
  },

  postInsumo: async (req, res) => {
    try {
      const  {IdProveedor,idReponsable,nombre,fecha,relacionNPK,cantidad,precio,observaciones} = req.body;

      const totl = cantidad*precio

      const insumo = new Insumo({IdProveedor,idReponsable,nombre,fecha,relacionNPK,cantidad,precio,observaciones,total:totl})
      await insumo.save()

      const invent = new Inventario({idInsumo:insumo._id, total: insumo.total})
      await invent.save()            
      res.json({ insumo })

    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: 'Error no se pudo agregar datos de el  insumo' })
    }
  },

  putInsumo: async (req, res) => {
    const { id } = req.params;
    const { IdProveedor, ...resto } = req.body;
    const insumo = await Insumo.findByIdAndUpdate(id, { IdProveedor, ...resto }, { new: true })
    res.json({ insumo })
  },


}


export default httpInsumo