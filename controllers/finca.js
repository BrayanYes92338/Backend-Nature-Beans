import Finca from '../models/finca.js'


const httpFinca ={
    getFinca: async (req, res)=>{
        const {buscar} = req.query;
        const fincas = await Finca.find({
            $or:[{nombre: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idUsuario'
        });
        res.json({fincas})
    },
    getFincaID: async (req ,res)=>{
        const {id}= req.params;
        const finca = await Finca.findById(id);
        res.json({finca})
    },
    getFincaActiva: async (req, res)=>{
    const FincaActiva = await Finca.find({estado:1})
    res.json({FincaActiva})
    },
    getFincaInactiva: async (req ,res)=>{
        const FincaActiva = await Finca.find({estado:0})
        res.json({FincaActiva})
    },
    postFinca: async (req, res)=>{
        try{
            const {idUsuario,nombre,ruc,ciudad,limites,departamento,direccion,ubicacion,area} = req.body;
            const fincas = new Finca({idUsuario,nombre,ruc,ciudad,limites,departamento,direccion,ubicacion,area})
            await fincas.save()
            res.json({fincas})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar finca'})
        }
    },
    putFinca: async (req ,res)=>{
        const {id}=req.params;
        const {idUsuario,...resto} = req.body;
        const fincas = await Finca.findByIdAndUpdate(id, {idUsuario, ...resto}, {new:true})
        res.json({fincas})
    },
    putFincaActivas: async (req, res) =>{
        const {id}= req.params;
        const finca = await Finca.findByIdAndUpdate(id, {estado:1}, {new: true})
        res.json({finca})
    },
    putFincasInactivas: async (req, res)=>{
        const {id}= req.params;
        const finca = await Finca.findByIdAndUpdate(id, {estado:0}, {new: true})
        res.json({finca})
    }

}

export default httpFinca;