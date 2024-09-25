import Insumo from "../models/insumos.js";


const httpInsumos = {

  getInsumos: async (req, res)=>{
    const {buscar} = req.query;
    const insumo = await Insumo.find({
      $or: [{ nombre: new RegExp(buscar, "i")}]
    })
    .populate({
      path: 'idFinca'
  })
    res.json ({insumo})
  },
  
  postInsumos: async (req, res) => {
    try {

      const  {idFinca,nombre,relacionNPK,registro_ICA,registro_Invima,cantidad,precio,observaciones,unidad} = req.body;

      const totl = cantidad*precio

      const insumo = new Insumo({idFinca,nombre,relacionNPK,registro_ICA,registro_Invima,cantidad,precio,observaciones,unidad,total:totl})
      await insumo.save()         
      res.json({ insumo })
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el registro de Insumos" }); 
    }
  },

  // putInsumos: async (req, res)=>{
  //   const { id } = req.params;
  //   const {IdProveedor,...resto} = req.body;
  //   const insumos = await Insumo.findByIdAndUpdate(id, {IdProveedor,...resto}, {new: true} )
  //   res.json({insumos})
  // }


  putInsumos: async (req, res)=>{
    const { id } = req.params;
    const {idFinca,nombre,relacionNPK,registro_ICA,registro_Invima,cantidad,precio,observaciones,unidad} = req.body;
    const totl = cantidad*precio
    const insumos = await Insumo.findByIdAndUpdate(id, {idFinca,nombre,relacionNPK,registro_ICA,registro_Invima,cantidad,precio,observaciones,unidad,total:totl}, {new: true} )
    res.json({insumos})
  }
}

export default httpInsumos