import ControlPlaga from "../models/controlPlagas.js"

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
    getControlPlagaTipo: async (req,res) => {
        try {
            const { tipo } = req.params;
            const ti = await ControlPlaga.find({tipo})
            res.json(ti)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se encontro el tipo Control de plaga' });
        }
    },
    getControlPlagaFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await ControlPlaga.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ningun Control de Plaga entre esas fechas"})
            }else{
       
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} las siguientes Controles de Plagas`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
        getControlPlagaOperario: async (req,res) => {
            try {
                const { id } = req.params;
                const empleado = await ControlPlaga.find({idOperario: id})
                .populate({path:"idOperario"})
                res.json(empleado)
            } catch (error) {
                res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
            }
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