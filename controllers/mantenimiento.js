import Mantenimiento from "../models/mantenimientos.js";
import mantenimiento from "../routes/mantenimiento.js";



const httpMantenimiento = {
  getMantenimiento: async (req, res) => {
    const { buscar } = req.query;
    const mantenimiento = await Mantenimiento.find()
    
    res.json({ mantenimiento });
  },
  getMantenimientoID: async (req, res) => {
    const { id } = req.params;
    const mantenimiento = await Mantenimiento.findById(id);
    res.json({ mantenimiento });
  },
  getmantenimientoFechas: async (req,res) => {

    const { fechaInicio, fechaFin } = req.body;
   
    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
    }
   
    try {
        const documentos = await Mantenimiento.find({
            fecha: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        })
        
   
        if(documentos.length === 0) {
            res.json({ message: "No se encontro ninguna mantenimienti entre esas fechas"})
        }else{
   
        res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes mantenimientos`, data: documentos});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }
   
    },
  getMantenimientoResponsable: async (req,res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const empleado = await Mantenimiento.find({responsable: id})
        .populate({path:"responsable"})
        
        res.json(empleado)
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }
},
getMantenimientoMaquina: async (req,res) => {
  try {
      const { id } = req.params;
      console.log(id);
      const maquina = await Mantenimiento.find({idMaquinaria: id})
      .populate({path:"idMaquinaria"})
      
      res.json(maquina)
  } catch (error) {
      res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
  }
},

  postMantenimiento: async (req, res) => {
    try {
      const  {
        idMaquinaria,
        responsable,
        observaciones}= req.body;
      const mantenimiento = new Mantenimiento({ idMaquinaria,
        responsable,
        observaciones})
      await mantenimiento.save()
      res.json({ mantenimiento })
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: 'Error no se pudo agregar datos de el mantenimiento' })
    }
  },

  putMantenimiento: async (req, res) => {
    const { id } = req.params;
    const { idMaquinaria, ...resto } = req.body;
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { idMaquinaria, ...resto }, { new: true })
    res.json({ mantenimiento })
  },


}
export default httpMantenimiento