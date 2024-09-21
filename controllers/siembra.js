import Siembra from "../models/siembra.js"

const httpSiembra = {

    getSiembra: async (req, res)=>{
        const {buscar} = req.query;
        const siem = await Siembra.find({
            $or:[{transplante: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idCultivo'
        });
        res.json({siem})
    },
    getSiembraID: async (req ,res)=>{
        const {id}= req.params;
        const siem = await Siembra.findById(id);
        res.json({siem})
    },
    getSiembraFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await Siembra.find({
                fechasiembra: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ninguna siembra entre esas fechas"})
            }else{
       
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} las siguientes siembras`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
        getSiembraEmpleado: async (req,res) => {
            try {
                const { id } = req.params;
                const empleado = await Siembra.find({idEmpleados: id})
                .populate({path:"idEmpleados"})
                res.json(empleado)
            } catch (error) {
                res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
            }
        },
        getSiembraCultAnterior: async (req,res) => {
            try {
                const { cultivoAnterior } = req.params;
                const ti = await Siembra.find({cultivoAnterior})
                res.json(ti)
            } catch (error) {
                res.status(500).json({ mensaje: 'No se encontro el tipo de Siembra' });
            }
        },
    postSiembra: async (req, res)=>{
        try{
            const {idCultivo,idEmpleados,idSemilla,cultivoAnterior,transplante} = req.body;
            const siem = new Siembra({idCultivo,idEmpleados,idSemilla,cultivoAnterior,transplante})
            await siem.save()
            res.json({siem})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar la Siembra'})
        }
    },
    putSiembra: async (req ,res)=>{
        const {id}=req.params;
        const {idCultivo,...resto} = req.body;
        const siem = await Siembra.findByIdAndUpdate(id, {idCultivo, ...resto}, {new:true})
        res.json({siem})
    },
} 

export default httpSiembra;
