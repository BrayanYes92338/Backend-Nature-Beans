import mongoose from "mongoose";

const insumoSchema=new mongoose.Schema({
    idFinca:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Finca"},
    nombre:{type:String,required:true},
    relacionNPK:{type:String,required:true},
    registro_ICA:{type:String,required:true},
    registro_Invima:{type:String,required:true},
    cantidad:{type:Number,default:0},
    precio:{type:Number,required:true},
    observaciones:{type:String,required:true},
    unidad:{type:String, required:true},
    total:{type:Number, default:true},
    fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Insumo",insumoSchema)