import mongoose from "mongoose";

const SustratoSchema = new mongoose.Schema({
   idProceso:{type:mongoose.Schema.Types.ObjectId,ref:'Proceso',required: true },
   idEmpleadooperario:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required: true},
   idEmpleadoresponsable: {type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required: true},
   productocomerdial: {type:String, required:true},
   ingredienteActivo:{type:String, required:true, },
   dosisUtilizada:{type:String, required:true},
   MetodoAplicacion:{type:String, required:true},
   fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Sustrato", SustratoSchema)

