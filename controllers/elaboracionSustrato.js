import Sustrato from "../models/elaboracionSustrato.js";
import Proceso from '../models/proceso.js'


const httpSustrato = {

  getSustrato: async (req, res) => {
  const {buscar} = req.query;
  const sustratos = await Sustrato.find({
    $or: [{productocomercial: new RegExp(buscar, "i")}]
   
  })
  .populate({
    path: 'idProceso'
})
.populate({
    path: 'idEmpleadooperario'
})
.populate({
  path: 'idEmpleadoresponsable'
});
   res.json({sustratos})
  },
  getSustratoID: async (req, res) => {
    const { id } = req.params;
    const elaboracionSustratos = await Sustrato.findById(id);
    res.json({ elaboracionSustratos });
  },
 
  postSustrato: async (req, res) => {
    try {
      const {idProceso, idEmpleadooperario, idEmpleadoresponsable, productocomercial, ingredienteActivo, dosisUtilizada, MetodoAplicacion} = req.body;
      const elaboracionSustratos = new Sustrato({idProceso, idEmpleadooperario, idEmpleadoresponsable, productocomercial, ingredienteActivo, dosisUtilizada, MetodoAplicacion} );
      await elaboracionSustratos.save();
      res.json({ elaboracionSustratos });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear la elaboracion de Sustratos" });
    }
  },
  putSustrato: async (req, res) => {
    const { id } = req.params;
    const { idProceso, ...resto } = req.body;
    const elaboracionSustratos = await Sustrato.findByIdAndUpdate(id,{ idProceso, ...resto }, { new: true });
    res.json({ elaboracionSustratos });
  },
  
 
  
};

export default httpSustrato;
