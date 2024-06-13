import mongoose from "mongoose";

const ProduccionSchema = new mongoose.Schema({
    idCultivo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    numLote:{type: String,required:true},
    producto:{type: String,required:true},
    cantidad:{type: Number,required:true},
    cantidadTrabajadores:{type: Number,required:true},
    observaciones:{type: String,required:true},
    fecha:{type:Date, default:Date.now}
})

export default mongoose.model("Produccion", ProduccionSchema)