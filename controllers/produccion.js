import Produccion from "../models/produccion.js"

const httpProduccion = {
    getProduccion: async (req, res) => {
        const { busqueda } = req.query;
        const produccion = await Produccion.find({
            $or: [{ numLote: new RegExp(busqueda, "i") }]
        });
        res.json({ produccion })
    },
    getProduccionID: async (req, res) => {
        const { id } = req.params;
        const produccion = await Produccion.findById(id);
        res.json({ produccion })
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