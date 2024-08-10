import Factura from "../models/factura.js";

const httpFactura ={

    getFactura: async (req, res)=>{
        const {buscar} = req.query;
        const fact = await Factura.find({
            $or:[{nombreProducto: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idInventario'
        });
        res.json({fact})
    },
    getFacturaID: async (req ,res)=>{
        const {id}= req.params;
        const factura = await Factura.findById(id);
        res.json({factura})
    },
    postFactura: async (req, res)=>{
        try{
            const {idInventario,idComprador,loteComercialnum,nombreProducto,precio,cantidad,iva,subtotal} = req.body;
            const factura = new Factura({idInventario,idComprador,loteComercialnum,nombreProducto,precio,cantidad,iva,subtotal})
            await factura.save()
            res.json({factura})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar factura'})
        }
    },
    putFactura: async (req ,res)=>{
        const {id}=req.params;
        const {idInventario,...resto} = req.body;
        const factura = await Factura.findByIdAndUpdate(id, {idInventario, ...resto}, {new:true})
        res.json({factura})
    },
}


export default httpFactura;