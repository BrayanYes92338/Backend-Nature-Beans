import Inventario from "../models/inventarios.js";

const httpinventario = {

    getInventario: async(req, res)=>{
        const {buscar} = req.query;
        const inv = await Inventario.find({
            $or:[{tipo: new RegExp(buscar, "i")}]
        }).populate({path:"idInsumo"})
        .populate({path:"idSemilla"})
        .populate({path:"idMaquinaria"})
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
    getInventarioTotalizar: async (req, res) => {

        let acum = 0
    
        const total = await Inventario.find();
    
        for (let i = 0; i < total.length; i++) {
          const element = total[i];
          acum = acum + element.total
        }
    
        res.json({msg:`El valor total del inventario es ${acum}`, data: total});
      },
    // postInventario: async (req, res)=>{
    //     try{
    //         const {idInsumo, idSemilla, idMaquinaria, tipo, observaciones, cantidad, unidad} = req.body;

    //         const inv = new Inventario({idInsumo, idSemilla, idMaquinaria, tipo, observaciones, cantidad, unidad})
    //         await inv.save()
    //         res.json({inv})

    //     }catch(error){
    //         console.log(error)
    //         res.status(400).json({msg: 'Error no se pudo agregar al inventario'})
    //     }
    // },
    putInventario: async (req ,res)=>{
        const {id}=req.params;
        const {idInventario,...resto} = req.body;
        const inv = await Inventario.findByIdAndUpdate(id, {idInventario, ...resto}, {new:true})
        res.json({inv})
    },
}

export default httpinventario;