import AnalisisSuelo from "../models/analisisSuelo.js";

const httpAnalisisSuelo = {
  getAnalisis: async (req, res) => {
    const {buscar} = req.query;
    const analisis = await AnalisisSuelo.find({
        $or: [{muestra: new RegExp(buscar,"i")}]
      })
      .populate({path:"idParcela"})
      .populate({path:"idEmpleado"});
    res.json({ analisis });
  },
  getAnalisisId: async (req, res) => {
    const { id } = req.params;
    const analisis = await AnalisisSuelo.findById(id);
    res.json({ analisis });
  },
  getResponsables: async (req, res) => {
    const { idEmpleado } = req.params;
    try {
      const analisis = await AnalisisSuelo
        .find(idEmpleado)
        .populate("idParcela")
        .populate("idEmpleado");
      res.json({ analisis });
    } catch (error) {
      console.error("Error al obtener los análisis por responsable:", error);
      res
        .status(500)
        .json({ error: "Error al obtener los análisis por responsable" });
    }
  },
  getAnalisisFechas: async (req,res) => {

    const { fechaInicio, fechaFin } = req.body;
   
    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
    }
   
    try {
        const documentos = await AnalisisSuelo.find({
            fecha: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        })
        
   
        if(documentos.length === 0) {
            res.json({ message: "No se encontro ningun analisis entre esas fechas"})
        }else{
   
        res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes analisis de suelos`, data: documentos});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }
   
    },
  
  postAnalisis: async (req, res) => {
    try {
      const {idParcela,idEmpleado, muestra,laboratorio,resultados,recomendaciones } = req.body;
      const analisis = new AnalisisSuelo({idParcela,idEmpleado, muestra,laboratorio,resultados,recomendaciones});

      await analisis.save();
      res.json({ analisis });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el Analisis" });
    }
  },
  putAnalisis: async (req, res) => {
    const { id } = req.params;
    const { idParcela, ...resto } = req.body;
    const analisis = await AnalisisSuelo.findByIdAndUpdate(
      id,
      { idParcela, ...resto },
      { new: true }
    );
    res.json({ analisis });
  },
};

export default httpAnalisisSuelo;
