import Proceso from "../models/proceso.js"
import Empleado from '../models/empleado.js'
import Cultivo from "../models/cultivo.js"

const httpProceso={
    getProceso: async (req, res)=>{
        const {buscar}=req.query;
        const procesos = await Proceso.find({
            $or:[{
                tipo:new RegExp(buscar, "i")}]
        })
        .populate({
            path: 'idCultivo'
        })
        .populate({
            path: 'idEmpleado'
        });
        res.json({procesos})
    },

    getProcesoID: async (req, res) => {
        const { id } = req.params;
        const procesos = await Proceso.findById(id);
        res.json({ procesos })
    },
   
    postProceso:async (req,res)=>{
        try {
            const {idCultivo,idEmpleado,tipo,descripcion,fechaInicio,fechaFinal} = req.body;
            
           const procesos = new Proceso ({idCultivo,idEmpleado,tipo,descripcion,fechaInicio,fechaFinal})
           await procesos.save()  
           res.json({procesos})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar datos del proceso'})
        }
    },
    putProceso: async (req,res)=>{
        const {id} =req.params;
        const {idCultivo,...resto}=req.body;
        const procesos=await Proceso.findByIdAndUpdate(id, {idCultivo,...resto}, {new:true} )
        res.json ({procesos}) 
    },
   

}

export default httpProceso