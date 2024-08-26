import Gastos from "../models/gastos.js"

const httpGastos = {

    getGastos: async (req, res)=>{
        const {buscar} = req.query;
        const siem = await Gastos.find({
            $or:[{numerofactura: new RegExp(buscar, "i")}]
        })
        res.json({siem})
    },
    getGastosID: async (req ,res)=>{
        const {id}= req.params;
        const siem = await Gastos.findById(id);
        res.json({siem})
    },
    postGastos: async (req, res)=>{
        try{
            const {idInsumo,idSemilla,idMantenimiento,nombre,numerofactura,descripcion} = req.body;
            const siem = new Gastos({idInsumo,idSemilla,idMantenimiento,nombre,numerofactura,descripcion})
            await siem.save()
            res.json({siem})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar la Gastos'})
        }
    },
    putGastos: async (req ,res)=>{
        const {id}=req.params;
        const {idInsumo,...resto} = req.body;
        const siem = await Gastos.findByIdAndUpdate(id, {idInsumo, ...resto}, {new:true})
        res.json({siem})
    },
}

export default httpGastos;