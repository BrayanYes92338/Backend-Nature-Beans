import Comprador from "../models/comprador.js";



const httpComprador = {
  getComprador: async (req, res) => {
    const { buscar } = req.query;
    const comprador = await Comprador.find()
    
    res.json({ comprador });
  },


  getCompradorID: async (req, res) => {
    const { id } = req.params;
    const comprador = await Comprador.findById(id);
    console.log(comprador);
    res.json({ comprador });
  },

  postComprador: async (req, res) => {
    try {
      const  {
      idProduccion,
      nombre,
      telefono,
      nguiaTransporte}= req.body;
      const comprador = new Comprador({ idProduccion,
        nombre,
        telefono,
        nguiaTransporte})
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