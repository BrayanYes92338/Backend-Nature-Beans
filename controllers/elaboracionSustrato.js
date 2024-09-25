import Sustrato from "../models/elaboracionSustrato.js";


const httpSustrato = {

  getSustrato: async (req, res) => {
  const {buscar} = req.query;
  const sustratos = await Sustrato.find({
    $or: [{productocomercial: new RegExp(buscar, "i")}]
   
  }).populate({path: 'idProceso'})
  .populate({path: 'idEmpleadooperario'})
  .populate({path: 'idEmpleadoresponsable'});
   res.json({sustratos})
  },
  getSustratoID: async (req, res) => {
    const { id } = req.params;
    const elaboracionSustratos = await Sustrato.findById(id);
    res.json({ elaboracionSustratos });
  },
  getSustratoOperario: async (req,res) => {
    try {
        const { id } = req.params;
        const empleado = await Sustrato.find({idEmpleadooperario: id})
        .populate({path:"idEmpleadooperario"})
        res.json(empleado)
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }
},
getSustratoResponsable: async (req,res) => {
  try {
      const { id } = req.params;
      const empleado = await Sustrato.find({idEmpleadoresponsable: id})
      .populate({path:"idEmpleadoresponsable"})
      res.json(empleado)
  } catch (error) {
      res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
  }
},
getSustratoFechas: async (req,res) => {

  const { fechaInicio, fechaFin } = req.body;
 
  if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
  }
 
  try {
      const documentos = await Sustrato.find({
          fecha: {
              $gte: new Date(fechaInicio),
              $lte: new Date(fechaFin)
          }
      })
      
 
      if(documentos.length === 0) {
          res.json({ message: "No se encontro ningun sustrato entre esas fechas"})
      }else{
 
      res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes sustratos`, data: documentos});
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
  }
 
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
