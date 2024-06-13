import mongoose from "mongoose";

const maquinariaSchema=new mongoose.Schema({
    idProveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    observaciones:{type:String,required:true},
    cantidad:{type:String,required:true},
    precio:{type:Number,required:true},
    total:{type:Number,default:0},
    fechaCompra:{type:Date, default:Date.now}
})

export default mongoose.model("Maquinaria",maquinariaSchema)