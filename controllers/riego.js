import Riego from "../models/riego.js"
import Cultivo from '../models/cultivo.js'
import Empleado from "../models/empleado.js"

const httpRiego={
    getRiego: async (req, res)=>{
        const {buscar}=req.query;
        const riegos = await Riego.find({
            $or:[{
                dosis:new RegExp(buscar, "i")}]
        })
        .populate({
            path: 'idCultivo'
        })
        .populate({
            path: 'idEmpleado'
        });
        res.json({riegos})
    },

    getRiegoID: async (req, res) => {
        const { id } = req.params;
        const riegos = await Riego.findById(id);
        res.json({ riegos })
    },
    
    postRiego:async (req,res)=>{
        try {
            const {idCultivo, idEmpleado,diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua} = req.body;
           const riegos = new Riego ({idCultivo, idEmpleado,diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua})
           await riegos.save()  
           res.json({riegos})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar datos del Riego'})
        }
    },
    putRiego: async (req,res)=>{
        const {id} =req.params;
        const {idCultivo,...resto}=req.body;
        const riegos=await Riego.findByIdAndUpdate(id, {idCultivo,...resto}, {new:true} )
        res.json ({riegos}) 
    },
    

}

export default httpRiego