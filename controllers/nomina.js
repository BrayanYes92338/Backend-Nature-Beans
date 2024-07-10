import Nomina from "../models/nomina.js";



const httpNomina = {
    getNomina: async(req, res)=>{
      const {buscar}=req.query;
      const nominas = await Nomina.find({
        $or:[{
          tipo: new RegExp(buscar, "i")}]
      })
      .populate({
        path: "idEmpleado"
      })
      res.json({nominas});
    },

    getNominaActiva: async (req, res) => {
        try {
          const nominaActiva = await Nomina.find({ estado: 1 });
          res.json({ nomina: nominaActiva });
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener nomina activa' });
        }
      },
      getNominaInactiva: async (req, res) => {
        try {
          const nominaInactiva = await Nomina.find({ estado: 0 });
          res.json({ nomina: nominaInactiva });
    
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener nomina inactiva' });
        }
      },
      getNomina: async (req, res) => {
        const nominas = await Nomina.find();
        res.json({ nominas });
      },
      getNominaID: async (req, res) => {
        const { id } = req.params;
        const nominas = await Nomina.findById(id);
        res.json({ nominas });
      },

      postNomina:async (req,res)=>{
        try {
            const {idEmpleado,tipo,valor} = req.body;
           const nominas = new Nomina ({idEmpleado,tipo,valor})
           await nominas.save()  
           res.json({nominas})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar datos de la nomina'})
        }
    },

    putNomina: async (req,res)=>{
      const {id} =req.params;
      const {idEmpleado,...resto}=req.body;
      const nominas=await Nomina.findByIdAndUpdate(id, {idEmpleado,...resto}, {new:true} )
      res.json ({nominas}) 
  },

  putNominaActiva: async(req,res)=>{
    const {id}=req.params;
    const nominas = await Nomina.findByIdAndUpdate(id, {estado:1},{new:true})
    res.json({nominas})
},
putNominaInactiva: async(req,res)=>{
    const {id}=req.params;
    const nominas = await Nomina.findByIdAndUpdate(id, {estado:0},{new:true})
    res.json({nominas})
},
     
}

export default httpNomina