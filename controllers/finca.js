import Finca from "../models/finca";
import usuario from "../models/usuario";

const httpFinca ={
    getFinca: async (req, res)=>{
        const {buscar} = req.query;
        const finca = await Finca.find({
            $or: [{nombre: new RegExp(buscar, "i")}]
        })
        res.json({finca})
    },
    getFincaID: async (req, res)=>{
        const {id} = req.params;
        const finca = await Finca.findById(id);
        res.json({finca})
    },
    postFinca: async (req, res)=>{
        try{
            const {idUsuario, nombre,ruc,ciudad,limites,departamento,direccion,ubicacion,area}= req.body;
            const finca = new Finca({idUsuario, nombre,ruc,ciudad,limites,departamento,direccion,ubicacion,area})
            await finca.save();
            res.json({finca})
        }catch(error){
           console.log(error)
           res.status(400).json({msg: "Error no se pudo agregar Finca"})
        }
    },

    putFinca: async (req, res) =>{
        const {id} = req.params;
        const {idUsuario,...resto} = req.body;
        const finca = await Finca.findByIdAndUpdate(id, {idUsuario,...resto}, {new:true})
    }

}

export default httpFinca