import Fertilizacion from "../models/fertilizacion.js";

const httpFertilizacion ={

    getFertilizacion: async (req, res)=>{
        const {buscar} = req.query;
        const fert = await Fertilizacion.find({
            $or:[{nombreFertilizante: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idCultivo'
        });
        res.json({fert})
    },
    getFertilizacionID: async (req ,res)=>{
        const {id}= req.params;
        const fert = await Fertilizacion.findById(id);
        res.json({fert})
    },
    postFertilizacion: async (req, res)=>{
        try{
            const {idCultivo,idEmpleado,idInventario,estadoFenologico,tipo,nombreFertilizante,cantidad} = req.body;
            const fert = new Fertilizacion({idCultivo,idEmpleado,idInventario,estadoFenologico,tipo,nombreFertilizante,cantidad})
            await fert.save()
            res.json({fert})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar fe'})
        }
    },
    putFertilizacion: async (req ,res)=>{
        const {id}=req.params;
        const {idCultivo,...resto} = req.body;
        const fert = await Fertilizacion.findByIdAndUpdate(id, {idCultivo, ...resto}, {new:true})
        res.json({fert})
    },
}

export default httpFertilizacion;