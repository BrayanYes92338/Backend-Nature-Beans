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
  }

}

export default httpInsumos