import Nomina from "../models/nomina.js";

const httpNomina = {
  getNomina: async (req, res) => {
    const { buscar } = req.query;
    const nominas = await Nomina.find({
      $or: [{ tipo: new RegExp(buscar, "i") }]
    })
      .populate({
        path: 'idEmpleado'
      });
    res.json({ nominas });
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
  getNominaID: async (req, res) => {
    const { id } = req.params;
    const nominas = await Nomina.findById(id);
    res.json({ nominas });
  },
  getNominaValor: async (req, res) => {

    let acum = 0

    const nominas = await Nomina.find();

    for (let i = 0; i < nominas.length; i++) {
      const element = nominas[i];
      acum = acum + element.valor
    }

    res.json({msg:`El valor total de las nominas es ${acum}`, data: nominas});
  },
  getNominaEmpleado: async (req,res) => {
    try {
        const { id } = req.params;
        const empleado = await Nomina.find({idEmpleado: id})
        .populate({path:"idEmpleado"})
        res.json(empleado)
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }
},
getNominaFechas: async (req,res) => {

 const { fechaInicio, fechaFin } = req.body;

 if (!fechaInicio || !fechaFin) {
     return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
 }

 try {
     const documentos = await Nomina.find({
         fecha: {
             $gte: new Date(fechaInicio),
             $lte: new Date(fechaFin)
         }
     })
     

     if(documentos.length === 0) {
         res.json({ message: "No se encontro ninguna nomina entre esas fechas"})
     }else{

     res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} las siguientes nominas`, data: documentos});
     }
 } catch (error) {
     console.error(error);
     res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
 }

 },
  postNomina: async (req, res) => {
    try {
      const { idEmpleado, tipo, valor } = req.body;
      const nominas = new Nomina({ idEmpleado, tipo, valor })
      await nominas.save()
      res.json({ nominas })

    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: 'Error no se pudo agregar datos de la nomina' })
    }
  },

  putNomina: async (req, res) => {
    const { id } = req.params;
    const { idEmpleado, ...resto } = req.body;
    const nominas = await Nomina.findByIdAndUpdate(id, { idEmpleado, ...resto }, { new: true })
    res.json({ nominas })
  },

  putNominaActiva: async (req, res) => {
    const { id } = req.params;
    const nominas = await Nomina.findByIdAndUpdate(id, { estado: 1 }, { new: true })
    res.json({ nominas })
  },
  putNominaInactiva: async (req, res) => {
    const { id } = req.params;
    const nominas = await Nomina.findByIdAndUpdate(id, { estado: 0 }, { new: true })
    res.json({ nominas })
  },

}

export default httpNomina