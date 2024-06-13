import mongoose from "mongoose";

const fertilizacionSchema = new mongoose.Schema({
    idCultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    idEmpleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    idInventario:{type:mongoose.Schema.Types.ObjectId,ref:'Inventario',required:true},
    estadoFenologico:{type:String,required:true},
    tipo:{type:String,required:true},
    nombreFertilizante:{type:String,required:true},
    cantidad:{type:Number,required:true}, 
    createdAt:{type:Date,default:Date.now}
})


export default mongoose.model("Fertilizacion",fertilizacionSchema)
