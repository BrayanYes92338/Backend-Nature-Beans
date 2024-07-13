import PreparacionSuelo from "../models/preparacionSuelo.js";

const httpPreparacionSuelo = {

  getPreparacionSuelo: async (req, res) => {
    const preparacion = await PreparacionSuelo.find();
    res.json({ preparacion });
  },


  getPreparacionID: async (req, res) => {
    const { id } = req.params;
    const preparacion = await PreparacionSuelo.findById(id);
    res.json({ preparacion });
  },
  postPreparacionSuelo: async (req, res) => {
    try {
      const {
        idParcela,
        operario,
        productos,
        observaciones
      } = req.body;
      const preparacion = new PreparacionSuelo({
        idParcela,
        operario,
        productos,                    
        observaciones
      });
      await preparacion.save();
      res.json({ preparacion });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear la preparacion de suelo" });
    }
  },
    putPreparacionSuelo: async (req, res) => {
      const { id } = req.params;
      const { idParcela, ...resto } = req.body;
      const preparacion = await PreparacionSuelo.findByIdAndUpdate(
        id, { idParcela, ...resto },{ new: true } );
      res.json({ preparacion });
    },
    getPreparacionEntreFechas: async (req, res) => {
      try {
        const { fechaInicio, fechaFin } = req.query;
      console.log(fechaFin,fechaInicio);
        if (!fechaInicio || !fechaFin) {
          return res
            .status(400)
            .json({ error: "Se requieren fechas de inicio y fin" });
        }
  
        const startDate = new Date(fechaInicio);
        const endDate = new Date(fechaFin);
  
        if (isNaN(startDate) || isNaN(endDate)) {
          return res.status(400).json({ error: "Fechas inválidas" });
        }
  
        const preparacion = await PreparacionSuelo.find({
          fecha: {
            $gte: startDate,
            $lte: endDate,
          },
        });
        res.json({ preparacion });
      } catch (error) {
        console.error("Error al obtener la preparacion entre fechas:", error);
        res
          .status(500)
          .json({ error: "Error al obtener la preparacion entre fechas" });
      }
    },
    getResponsables: async (req, res) => {
      const { operario } = req.params;
      try {
        const preparacion = await PreparacionSuelo.find( operario ).populate('operario')
        res.json({ preparacion });
      } catch (error) {
        console.error("Error al obtener los análisis por responsable:", error);
        res
          .status(500)
          .json({ error: "Error al obtener los análisis por responsable" });
      }
    },
};

export default httpPreparacionSuelo;
