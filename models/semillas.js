import mongoose from "mongoose";

const SemillaSchema = new mongoose.Schema({
    idFinca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    registro_ICA:{type:String,required:true},
    registro_Invima:{type:String,required:true},
    fechaCompra:{type: Date,default:Date.now},
    fechaVencimiento:{type: Date,required:true},
    especie:{type: String,required:true},
    numLote:{type: String,required:true},
    origen:{type: String,required:true},
    poderGerminativo:{type: String,required:true},
    estado:{type:Number,default:1}
}) 

export default mongoose.model("Semilla", SemillaSchema)

