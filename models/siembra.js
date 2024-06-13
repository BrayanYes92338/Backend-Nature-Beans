import mongoose from "mongoose";

const SiembraSchema = new mongoose.Schema({
    idCultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    idEmpleados: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    idInventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
    fechasiembra:{type:Date, default:Date.now},
    fechacosecha:{type:Date, default:Date.now},
    cultivoAnterior:{type: String,required:true},  
    transplante:{type: String,required:true},
})

export default mongoose.model("Siembra", SiembraSchema)