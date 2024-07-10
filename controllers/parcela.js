import Parcela from "../models/parcelas.js";

const httpParcela = {
  getParcela: async (req, res) => {
    const parcela = await Parcela.find();
    res.json({ parcela });
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
};

export default httpParcela;
