import mongoose from "mongoose";

const gastosSchema = new mongoose.Schema({
    idFinca: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Finca" },
    nombre: { type: String, required: true },
    semillas: [{
        idSemilla: { type: mongoose.Schema.Types.ObjectId, ref: "Semilla" },
        idProveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" },
        unidadSemilla: { type: String, default: 0 },
        precioSemilla: { type: Number, default: 0 },
        cantidadSemilla: { type: Number, default: 0 },
        totalSemilla: { type: Number, default: 0 },
    }],
    insumo: [{
        idInsumo: { type: mongoose.Schema.Types.ObjectId, ref: "Insumo" },
        idProveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" },
        unidadInsumo: { type: String, default: 0 },
        cantidadInsumo: { type: Number, default: 0 },
        totalInsumo: { type: Number, default: 0 },
    }],
    numerofactura: { type: String, unique: true, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Gasto",gastosSchema)