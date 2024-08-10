import mongoose from "mongoose";

const inventarioSchema=new mongoose.Schema({
    idInsumo:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Insumo"},
    idSemilla:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Semilla"},
    idMaquinaria:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Maquinaria"},
    tipo:{type:String,required:true},
    observaciones:{type:String,required:true},
    cantidad:{type:Number,default:0},
    unidad:{type:Number,required:true},
    fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Inventario",inventarioSchema)