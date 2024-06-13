import mongoose from "mongoose";

const RiegoSchema = new mongoose.Schema({
    idCultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    idEmpleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    fechaRiego:{type:Date, default:Date.now},
    diasTransplante:{type: String,required:true},
    estadoFenológico:{type: String,required:true},
    horaInicio:{type: String,required:true},
    horaFin:{type: String,required:true},
    dosis:{type: String,required:true},
    cantidadAgua:{type: Number,required:true}
})

export default mongoose.model("Riego", RiegoSchema)


