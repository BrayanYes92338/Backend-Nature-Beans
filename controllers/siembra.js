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
    postSiembra: async (req, res)=>{
        try{
            const {idCultivo,idEmpleados,idInventario,cultivoAnterior,transplante} = req.body;
            const siem = new Siembra({idCultivo,idEmpleados,idInventario,cultivoAnterior,transplante})
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
