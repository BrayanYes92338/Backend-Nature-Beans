import Produccion from "../models/produccion.js"

const httpProduccion = {
    getProduccion: async (req, res) => {
        const { busqueda } = req.query;
        const produccion = await Produccion.find({
            $or: [{ numLote: new RegExp(busqueda, "i") }]
        })  .populate({
            path: 'idCultivo'
        });
        res.json({ produccion })
    },
    getProduccionID: async (req, res) => {
        const { id } = req.params;
        const produccion = await Produccion.findById(id);
        res.json({ produccion })
    },
    getProduccionTotal: async (req,res) => {

        let acum = 0

        try {
            
            const pro = await Produccion.find()

            for (let i = 0; i < pro.length; i++) {
                const element = pro[i];
                acum = acum + element.cantidad
            }

            res.json({msg:`La cantidad total producida es ${acum}`, data: pro});
        } catch (error) {
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    getProduccionEntreFechas: async (req,res) => {
   
       const { fechaInicio, fechaFin } = req.body;
   
       if (!fechaInicio || !fechaFin) {
           return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
       }
   
       try {
           const documentos = await Produccion.find({
               fecha: {
                   $gte: new Date(fechaInicio),
                   $lte: new Date(fechaFin)
               }
           })
           
           if(documentos.length === 0) {
               res.json({ message: "No se encontro ningun cultivo en produccion entre esas fechas"})
           }else{
               
           for (let i = 0; i < documentos.length; i++) {
               const element = documentos[i];
           }
   
           res.json({msg:`Se encontraron entre las fechas ${fechaInicio} y ${fechaFin} los siguientes cultivos en produccion`, data: documentos});
           }
       } catch (error) {
           console.error(error);
           res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
       }
   
       },
    postProduccion:async (req,res)=>{
        try {
            const {idCultivo,numLote,producto,cantidad,cantidadTrabajadores,observaciones} = req.body;
           const produccion = new Produccion({idCultivo,numLote,producto,cantidad,cantidadTrabajadores,observaciones})
           await produccion.save()  
           res.json({produccion})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar datos del produccion'})
        }
    },
    putProduccion: async (req,res)=>{
        const {id} =req.params;
        const {idCultivo,...resto}=req.body;
        const produccion =await Produccion.findByIdAndUpdate(id, {idCultivo,...resto}, {new:true} )
        res.json ({ produccion }) 
    },
}

export default httpProduccion