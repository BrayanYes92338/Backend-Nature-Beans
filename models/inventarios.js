import mongoose from "mongoose";

const inventarioSchema=new mongoose.Schema({
    idInsumo:{type:mongoose.Schema.Types.ObjectId,ref:"Insumo"},
    idSemilla:{type:mongoose.Schema.Types.ObjectId,ref:"Semilla"},
    idMaquinaria:{type:mongoose.Schema.Types.ObjectId,ref:"Maquinaria"},
    tipo:{type:String,default:""},
    observaciones:{type:String,default:""},
    cantidad:{type:Number,default:0},
    unidad:{type:String,default:""},
    total:{type:Number,default:0},
    fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Inventario",inventarioSchema)