import Riego from "../models/riego.js"


const httpRiego={
    getRiego: async (req, res)=>{
        const {buscar}=req.query;
        const riegos = await Riego.find({
            $or:[{
                dosis:new RegExp(buscar, "i")}]})
        .populate({ path: 'idCultivo'})
        .populate({ path: 'idEmpleado'});
        res.json({riegos})
    },
    getRiegoID: async (req, res) => {
        const { id } = req.params;
        const riegos = await Riego.findById(id);
        res.json({ riegos })
    },
    getRiegoEmpleado: async (req,res) => {
        try {
            const { id } = req.params;
            const empleado = await Riego.find({idEmpleado: id})
            .populate({path:"idEmpleado"})
            res.json(empleado)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    getRiegoCultivo: async (req,res) => {
        try {
            const { id } = req.params;
            const cultivo = await Riego.find({idCultivo: id})
            .populate({path:"idCultivo"})
            res.json(cultivo)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    getRiegoFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await Riego.find({  
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ningun Riego entre esas fechas"})
            }else{
       
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes riegos`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
        getRiegoCantAgua: async (req,res) => {
            try {
                const { cantidadAgua } = req.params;
                const ti = await Riego.find({cantidadAgua})
                res.json(ti)
            } catch (error) {
                res.status(500).json({ mensaje: 'No se encontro el tipo de cultivo' });
            }
        },
    postRiego:async (req,res)=>{
        try {
            const {idCultivo,idEmpleado,diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua} = req.body;
           const riegos = new Riego ({idCultivo,idEmpleado,diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua})
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