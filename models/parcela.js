import mongoose from "mongoose";

const ParcelaSchema = new mongoose.Schema({
    idFinca:{type:mongoose.Schema.Types.ObjectId,ref:'Finca',required:true},
    asistenteTecnico:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    ubicacion:{type:String,required:true},
    numero:{type:Number,required:true, unique:true},
    cultivoAnterior:{type:String,required:true},
    cultivoActual:{type:Number,required:true},
    detalle:{type:String,required:true},
    area:{type:Number,required:true},
    estado:{type:Number,default:1}
})


export default mongoose.model("Parcela",ParcelaSchema)