import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema({
    idInventario:{type:mongoose.Schema.Types.ObjectId,ref:'Inventario',required:true},
    idComprador:{type:mongoose.Schema.Types.ObjectId,ref:'Comprador',required:true},
    loteComercialnum:{type:String,required:true},
    nombreProducto:{type:String,required:true},
    precio:{type:Number, default:0, required:true},
    cantidad:{type:Number,required:true},
    iva:{type:Number,default:0, required:true},
    subtotal:{type:Number,required:true},
    total:{type:Number, default:0},
    createdAt:{type:Date,default:Date.now}
})


export default mongoose.model("Factura",facturaSchema)
