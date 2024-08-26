import Parcela from '../models/parcela.js'

const httpParcelas = {
  getParcela: async (req, res) => {
    const { buscar } = req.query
    const parcela = await Parcela.find({
      $or: [{ ubicacion: new RegExp(buscar, "i") }]
    })
    .populate({path:'idFinca'})
    .populate({path:'asistenteTecnico'})
    res.json({ parcela })
  },
  getParcelaActivas: async (req, res)=>{
     const parcelas = await Parcela.find({estado:1})
     .populate({path:'idFinca'})
     .populate({path:'asistenteTecnico'})
     res.json({parcelas})
    },
  getParcelaInactiva: async (req, res)=>{
    const parcelas = await Parcela.find({estado:0})
     .populate({path:'idFinca'})
    .populate({path:'asistenteTecnico'})
    res.json({parcelas})
  },

  postParcela: async (req, res) => {
    try {
      const { idFinca, asistenteTecnico, ubicacion, numero, cultivoAnterior, cultivoActual, detalle, area } = req.body;
      const parcela = new Parcela({ idFinca, asistenteTecnico, ubicacion, numero, cultivoAnterior, cultivoActual, detalle, area });
      await parcela.save()
      res.json({ parcela })
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear la parcela" })
    }
  },
  putParcela: async (req, res)=>{
    const {id}= req.params;
    const {idFinca, ...resto} = req.body;
    const parcela = await Parcela.findByIdAndUpdate(id, {idFinca, ...resto}, {new: true});
    res.json({parcela})
  },
   
  putParcelaActivar: async (req, res)=>{
    const {id}= req.params;
    const parcela = await Parcela.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({parcela})
  },
  putParcelaDesactivar: async (req, res)=>{
    const {id}= req.params;
    const parcela = await Parcela.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({parcela})
  },

}


export default httpParcelas