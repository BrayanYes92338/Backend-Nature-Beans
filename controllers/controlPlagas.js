import ControlPlaga from "../models/controlPlagas.js"
import Cultivo from '../models/cultivo.js'
import Empleado from "../models/empleado.js"

const httpControlPlaga={
    getControlPlaga: async (req, res)=>{
        const {buscar}=req.query;
        const controlPlagas = await ControlPlaga.find({
            $or:[{
                tipo:new RegExp(buscar, "i")}]
        })
        .populate({
            path: 'idCultivo'
        })

        .populate({
            path: 'idEmpleado'
        })
        .populate({
            path: 'idOperario'
        });
        res.json({controlPlagas})
    },

    getControlPlagaID: async (req, res) => {
        const { id } = req.params;
        const controlPlagas = await ControlPlaga.findById(id);
        res.json({ controlPlagas })
    },

    postControlPlaga:async (req,res)=>{
        try {
            const {idCultivo,idEmpleado,idOperario,nombre,tipo,ingredienteActivo,dosis,observaciones} = req.body;
           const controlPlagas = new ControlPlaga ({idCultivo,idEmpleado,idOperario,nombre,tipo,ingredienteActivo,dosis,observaciones})
           await controlPlagas.save()  
           res.json({controlPlagas})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar datos del Control de Plaga'})
        }
    },
    putControlPlaga: async (req,res)=>{
        const {id} =req.params;
        const {idCultivo,...resto}=req.body;
        const controlPlagas=await ControlPlaga.findByIdAndUpdate(id, {idCultivo,...resto}, {new:true} )
        res.json ({controlPlagas}) 
    },
   

}

export default httpControlPlaga