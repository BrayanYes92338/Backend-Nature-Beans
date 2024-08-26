import Insumo from "../models/insumos.js"

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
      const { IdProveedor, idReponsable, nombre, relacionNPK, cantidad, unidad, observaciones, total } = req.body;
  
      // Validar la relación NPK
      const regex = /^(\d+\s+){2}\d+$/;
      if (!regex.test(relacionNPK)) {
        return res.status(400).json({ msg: 'La relación NPK debe contener exactamente tres números separados por espacios' });
      }
  
      const formattedRelacionNPK = relacionNPK.split(' ').join('-');
  
      const insumos = new Insumo({IdProveedor, idReponsable,nombre, relacionNPK: formattedRelacionNPK,cantidad,unidad,observaciones,  total });
  
      await insumos.save();
      res.json({ insumos });
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