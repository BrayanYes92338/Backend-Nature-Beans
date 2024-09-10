import Insumo from "../models/insumos.js";
import Inventario from "../models/inventarios.js";


const httpInsumos = {

  getInsumos: async (req, res)=>{
    const {buscar} = req.query;
    const insumo = await Insumo.find({
      $or: [{ nombre: new RegExp(buscar, "i")}]
    })
    .populate({
      path: 'IdProveedor'
  })
  .populate({
      path: 'idReponsable'
  });
    res.json ({insumo})
  },
  
  postInsumos: async (req, res) => {
    try {

      const  {IdProveedor,unidad,idReponsable,nombre,fecha,relacionNPK,cantidad,precio,observaciones} = req.body;

      const totl = cantidad*precio

      const insumo = new Insumo({IdProveedor,unidad,idReponsable,nombre,fecha,relacionNPK,cantidad,precio,observaciones,total:totl})
      await insumo.save()

      const invent = new Inventario({idInsumo:insumo._id, total: insumo.total})
      await invent.save()            
      res.json({ insumo })
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el registro de Insumos" });
    }
  },
  

  putInsumos: async (req, res)=>{
    const { id } = req.params;
    const {IdProveedor,...resto} = req.body;
    const insumos = await Insumo.findByIdAndUpdate(id, {IdProveedor,...resto}, {new: true} )
    res.json({insumos})
  }

}

export default httpInsumos