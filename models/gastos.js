import mongoose from "mongoose";

const gastosSchema=new mongoose.Schema({
    idInsumo:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Insumo"},
    idSemilla:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Semilla"},
    idMantenimiento:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Mantenimiento"},
    nombre:{type:String,required:true},
    numerofactura:{type:String,unique:true,required:true},
    descripcion:{type:String,required:true},
    total:{type:Number,default:0},
    fecha:{type:Date, default:Date.now},
})

export default mongoose.model("Gasto",gastosSchema)