import MaquinariaHerramientas from "../models/maquinariaHerramientas.js";

const httpmaquinariaHerramientas = {

    getMaquinariaHerramientas: async(req, res)=>{
        const {buscar} = req.query;
        const maquinas = await MaquinariaHerramientas.find({
            $or:[{tipo: new RegExp(buscar, "i")}]
        })
        res.json({maquinas})
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

            const maquinas = new MaquinariaHerramientas({idProveedor,nombre,tipo,observaciones,cantidad,precio,total: totl})
            await maquinas.save()
            res.json({maquinas})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar la maquinaria o herramienta'})
        }
    },
    putMaquinariaHerramientas: async (req ,res)=>{
        const {id}=req.params;
        const {idProveedor,...resto} = req.body;
        const maquinas = await MaquinariaHerramientas.findByIdAndUpdate(id, {idProveedor, ...resto}, {new:true})
        res.json({maquinas})
    },
}

export default httpmaquinariaHerramientas;