import mongoose from "mongoose";

const compradorSchema=new mongoose.Schema({
    idProduccion:{type:mongoose.Schema.Types.ObjectId,ref:'Produccion',required:true},
    createdAt:{type:Date,default:Date.now},
    especie:{type:String,required:true},
    nombre:{type:String,required:true},
    tipoDocumento:{type:String,required:true},
    documento:{type:Number,required:true, unique:true},
    telefono:{type:String,required:true},
    direccion:{type:String,required:true},
    cantidad:{type:Number,required:true},
    nguiaTransporte:{type:String,required:true, unique:true},
    fecha:{type:Date,default:Date.now},
    valor:{type:Number,required:true},
    estado:{type:Number,default:1},

})

export default mongoose.model("Comprador",compradorSchema)
