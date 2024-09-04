import Inventario from "../models/inventarios.js";

const httpinventario = {

    getInventario: async(req, res)=>{
        const {buscar} = req.query;
        const inv = await Inventario.find({
            $or:[{tipo: new RegExp(buscar, "i")}]
        })
        res.json({inv})
    },
    getInventarioID: async (req ,res)=>{
        const {id}= req.params;
        const inv = await Inventario.findById(id);
        res.json({inv})
    },
    getInventarioCant: async (req ,res)=>{

        try {       
            const {cantidad}= req.params;
            console.log(cantidad);
            const inv = await Inventario.find({cantidad});
            res.json({inv})
        } catch (error) {
        res.status(500).json({ mensaje: 'No se encontro esa cantidad en el inventario' });
        }
    }, 
    postInventario: async (req, res)=>{
        try{
            const {idInsumo, idSemilla, idMaquinaria, tipo, observaciones, cantidad, unidad} = req.body;

            const inv = new Inventario({idInsumo, idSemilla, idMaquinaria, tipo, observaciones, cantidad, unidad})
            await inv.save()
            res.json({inv})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar al inventario'})
        }
    },
    putInventario: async (req ,res)=>{
        const {id}=req.params;
        const {idInventario,...resto} = req.body;
        const inv = await Inventario.findByIdAndUpdate(id, {idInventario, ...resto}, {new:true})
        res.json({inv})
    },
}

export default httpinventario;