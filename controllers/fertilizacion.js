import Fertilizacion from "../models/fertilizacion.js";

const httpFertilizacion ={

    getFertilizacion: async (req, res)=>{
        const {buscar} = req.query;
        const fert = await Fertilizacion.find({
            $or:[{nombreFertilizante: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idCultivo'
        })
        .populate({
            path:"idEmpleado"
        })
        .populate({
            path:'idInsumo'
        });
        res.json({fert})
    },
    getFertilizacionID: async (req ,res)=>{
        const {id}= req.params;
        const fert = await Fertilizacion.findById(id);
        res.json({fert})
    },
    getFertilizacionEmpleado: async (req,res) => {
        try {
            const { id } = req.params;
            const empleado = await Fertilizacion.find({idEmpleado: id})
            .populate({path:"idEmpleado"})
            res.json(empleado)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    getFertilizacionFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
    
        try {
            const documentos = await Fertilizacion.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })

        
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ninguna Fertilizacion entre esas fechas"})
            }else{
            
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} las siguientes Fertilizaciones`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    
        },

    postFertilizacion: async (req, res)=>{
        try{
            const {idCultivo,idEmpleado,idInsumo,estadoFenologico,tipo,nombreFertilizante,cantidad} = req.body;
            const fert = new Fertilizacion({idCultivo,idEmpleado,idInsumo,estadoFenologico,tipo,nombreFertilizante,cantidad})
            await fert.save()
            res.json({fert})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar fertilizacion'})
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