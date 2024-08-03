import MaquinariaHerramientas from "../models/maquinariaHerramientas.js";

const httpmaquinariaHerramientas = {

    getMaquinariaHerramientas: async(req, res)=>{
        const {buscar} = req.query;
        const fincas = await MaquinariaHerramientas.find({
            $or:[{nombre: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idProveedor'
        });
        res.json({fincas})
    },
    getMaquinariaHerramientasID: async (req ,res)=>{
        const {id}= req.params;
        const finca = await MaquinariaHerramientas.findById(id);
        res.json({finca})
    },
    postMaquinariaHerramientas: async (req, res)=>{
        try{
            const {idProveedor,nombre,tipo,observaciones,cantidad,precio} = req.body;

           const totl = cantidad * precio

            const fincas = new MaquinariaHerramientas({idProveedor,nombre,tipo,observaciones,cantidad,precio,total: totl})
            await fincas.save()
            res.json({fincas})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar la maquinaria o herramienta'})
        }
    },
    putMaquinariaHerramientas: async (req ,res)=>{
        const {id}=req.params;
        const {idProveedor,...resto} = req.body;
        const fincas = await MaquinariaHerramientas.findByIdAndUpdate(id, {idProveedor, ...resto}, {new:true})
        res.json({fincas})
    },
}

export default httpmaquinariaHerramientas;