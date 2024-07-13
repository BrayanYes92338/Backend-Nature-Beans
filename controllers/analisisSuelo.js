import analisisSuelo from "../models/analisisSuelo.js";

const httpAnalisisSuelo = {
  getAnalisis: async (req, res) => {
    const Analisis = await analisisSuelo
      .find()
      .populate("idParcela")
      .populate("idEmpleado");
    res.json({ Analisis });
  },
  getAnalisisId: async (req, res) => {
    const { id } = req.params;
    const analisis = await analisisSuelo.findById(id);
    res.json({ analisis });
  },
  getResponsables: async (req, res) => {
    const { idEmpleado } = req.params;
    try {
      const analisis = await analisisSuelo
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
  getAnalisisEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;
      console.log(fechaFin, fechaInicio);
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

      const analisis = await analisisSuelo.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      res.json({ analisis });
    } catch (error) {
      console.error("Error al obtener las ventas entre fechas:", error);
      res
        .status(500)
        .json({ error: "Error al obtener las ventas entre fechas" });
    }
  },
  postAnalisis: async (req, res) => {
    try {
      const {
        idParcela,
        idEmpleado,
        muestra,
        cultivo,
        laboratorio,
        resultados,
        recomendaciones,
      } = req.body;
      const analisis = new analisisSuelo({
        idParcela,
        idEmpleado,
        muestra,
        cultivo,
        laboratorio,
        resultados,
        recomendaciones,
      });

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
    const analisis = await analisisSuelo.findByIdAndUpdate(
      id,
      { idParcela, ...resto },
      { new: true }
    );
    res.json({ analisis });
  },
};

export default httpAnalisisSuelo;
