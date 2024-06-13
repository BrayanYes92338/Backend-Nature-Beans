import mongoose from "mongoose";

const ControlPlagasSchema=new mongoose.Schema({
    idCultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    idEmpleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    idOperario:{type:mongoose.Schema.Types.ObjectId,ref:'Operario',required:true},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    ingredienteActivo:{type:String,required:true},
    dosis:{type:Number,required:true},
    observaciones:{type:String},
    createdAt:{type:Date,default:Date.now},
})

export default mongoose.model("ControlPlaga",ControlPlagasSchema)
