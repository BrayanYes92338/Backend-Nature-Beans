import Parcela from "../models/parcelas.js";

const httpParcela = {
  getParcela: async (req, res) => {
    const parcela = await Parcela.find();
    res.json({ parcela });
  },
  getParcelaActiva: async (req, res)=>{
    const parcelas = await Parcela.find({estado:1})
    res.json({parcelas})
    },
    getParcelaInactiva: async (req ,res)=>{
        const parcelas = await Parcela.find({estado:0})
        res.json({parcelas})
    },
  postParcela: async (req, res) => {
    try {
      const {idFinca,asistenteTecnico,ubicacion,numero,cultivoAnterior,cultivoActual,detalle,area,estado} = req.body;
      const parcela = new Parcela({idFinca,asistenteTecnico,ubicacion,numero,cultivoAnterior,cultivoActual,detalle,area,estado});

      await parcela.save();
      res.json({ parcela });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear la Parcela" });
    }
  },
  putParcela: async (req ,res)=>{
    const {id}=req.params;
    const {idFinca, ...resto} = req.body;
    const parcelas = await Parcela.findByIdAndUpdate(id, {idFinca, ...resto}, {new:true})
    res.json({parcelas})
},
putParcelaActivas: async (req, res) =>{
  const {id}= req.params;
  const parcelas = await Parcela.findByIdAndUpdate(id, {estado:1}, {new: true})
  res.json({parcelas})
},
putParcelaInactivas: async (req, res)=>{
  const {id}= req.params;
  const parcelas = await Parcela.findByIdAndUpdate(id, {estado:0}, {new: true})
  res.json({parcelas})
}
};

export default httpParcela;
