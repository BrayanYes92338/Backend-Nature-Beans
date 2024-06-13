import mongoose from "mongoose";

const SemillaSchema = new mongoose.Schema({
    idProveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    numFactura:{type:Number,required:true},
    fechaCompra:{type: Date,required:true},
    fechaVencimiento:{type: Date,required:true},
    especie:{type: String,required:true},
    variedad:{type: String,required:true},
    NumLote:{type: Number,required:true},
    origen:{type: String,required:true},
    poderGerminativo:{type: String,required:true},
})

export default mongoose.model("Semilla", SemillaSchema)

