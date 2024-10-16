import mongoose from "mongoose";

const ProcesoSchema = new mongoose.Schema({
    idCultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required: true },
    idEmpleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required: true },
    tipo:{type: String,required:true},
    descripcion:{type: String,required:true},
    fechaInicio:{type:Date, default:Date},
    fechaFinal:{type:Date, default:Date},
    fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Proceso", ProcesoSchema)