import mongoose from "mongoose";

const mantenimientoSchema=new mongoose.Schema({
    idMaquinaria:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Maquinaria"},
    responsable:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    observaciones:{type:String,required:true},
    verificacionRealizada:{type:Number,default:0},
    fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Mantenimiento",mantenimientoSchema)