import mongoose from "mongoose";

const cultivoSchema = new mongoose.Schema({
    idParcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    estado:{type:Number,default:1}
})


export default mongoose.model("Cultivo",cultivoSchema)

