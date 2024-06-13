import mongoose from "mongoose";

const cultivoSchema = new mongoose.Schema({
    idParcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    Nombre:{type:String,required:true},
    tipo:{type:String,required:true},
})


export default mongoose.model("Cultivo",cultivoSchema)

