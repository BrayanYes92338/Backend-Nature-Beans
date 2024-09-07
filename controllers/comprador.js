import Comprador from "../models/comprador.js";

const httpComprador = {
  getComprador: async (req, res) => {
    const comprador = await Comprador.find()
     .populate({
      path:'idProduccion'
     }) 
    res.json({ comprador });
  },


  getCompradorActivo: async (req, res)=>{
    const compradores = await Comprador.find({estado: 1})
    .populate({
      path: 'idProduccion'
  })
    res.json({ compradores })
  },

  getCompradorInactivo: async (req, res)=>{
    const compradores = await Comprador.find({estado: 0})
    .populate({
      path: 'idProduccion'
  })
    res.json({ compradores })
  },


  getCompradorID: async (req, res) => {
    const { id } = req.params;
    const comprador = await Comprador.findById(id);
    console.log(comprador);
    res.json({ comprador });
  },

  getCompradorFechas: async (req,res) => {

    const { fechaInicio, fechaFin } = req.body;
   
    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
    }
   
    try {
        const documentos = await Comprador.find({
            fecha: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        })
        
   
        if(documentos.length === 0) {
            res.json({ message: "No se encontro ningun Comprador entre esas fechas"})
        }else{
   
        res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes Compradores`, data: documentos});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }
   
    },

  postComprador: async (req, res) => {
    try {
      const  { idProduccion, especie, nombre, tipoDocumento, documento, telefono, direccion, cantidad,nguiaTransporte, valor,} = req.body;
      const comprador = new Comprador({ idProduccion, especie, tipoDocumento, nombre, documento, telefono, direccion, cantidad,nguiaTransporte, valor})
      await comprador.save()
      res.json({ comprador })
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: 'Error no se pudo agregar datos de el Comprador' })
    }
  },

  putcomprador: async (req, res) => {
    const { id } = req.params;
    const { idProduccion, ...resto } = req.body;
    const comprador = await Comprador.findByIdAndUpdate(id, { idProduccion, ...resto }, { new: true })
    res.json({ comprador })
  },


},

  putCompradorActiva: async (req, res) => {
    const { id } = req.params;
    const comprador = await Comprador.findByIdAndUpdate(id, { estado: 1 }, { new: true })
    res.json({ comprador })
  },
    
  putCompradorInactiva: async (req, res) => {
    const { id } = req.params;
    const comprador = await Comprador.findByIdAndUpdate(id, { estado: 0 }, { new: true })
    res.json({ comprador })
  },

}


export default httpComprador