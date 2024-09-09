import Proceso from "../models/proceso.js"
import Empleado from '../models/empleado.js'
import Cultivo from "../models/cultivo.js"

const httpProceso={
    getProceso: async (req, res)=>{
        const {buscar}=req.query;
        const procesos = await Proceso.find({
            $or:[{
                tipo:new RegExp(buscar, "i")}]})
        .populate({
            path: 'idCultivo'})
        .populate({
            path: 'idEmpleado'});
        res.json({procesos})
    },

    getProcesoID: async (req, res) => {
        const { id } = req.params;
        const procesos = await Proceso.findById(id);
        res.json({ procesos })
    },
   
    getProcesoEmpleado: async (req,res) => {
        try {
            const { id } = req.params;
            const empleado = await Proceso.find({idEmpleado: id})
            .populate({path:"idEmpleado"})
            res.json(empleado)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    getProcesosFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await Proceso.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ningun proceso entre esas fechas"})
            }else{
       
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes Procesos`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
        getProcesoTipo: async (req,res) => {
            try {
                const { tipo } = req.params;
                const ti = await Proceso.find({tipo})
                res.json(ti)
            } catch (error) {
                res.status(500).json({ mensaje: 'No se encontro el tipo de proceso' });
            }
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