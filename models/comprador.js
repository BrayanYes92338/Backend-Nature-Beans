import mongoose from "mongoose";

const compradorSchema=new mongoose.Schema({
    idProduccion:{type:mongoose.Schema.Types.ObjectId,ref:'Produccion',required:true},
    nombre:{type:String,required:true},
    telefono:{type:String,required:true},
    nguiaTransporte:{type:String,required:true, unique:true},
    createdAt:{type:Date,default:Date.now},
})

export default mongoose.model("Comprador",compradorSchema)
