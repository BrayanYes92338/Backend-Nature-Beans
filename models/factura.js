import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema({
    idComprador: { type: mongoose.Schema.Types.ObjectId, ref: 'Comprador', required: true },
    loteComercialnum: { type: String, required: true },
    total: { type: Number, default: 0 },
    fecha: { type: Date, default: Date.now },
    detalle: [{
        idProduccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Comprador', required: true },
        nombreProducto: { type: String, default: 0},
        precio: { type: Number, default: 0, required: true },
        cantidad: { type: Number, required: true }, 
        iva: { type: Number, default: 0, required: true },
        subtotal: { type: Number, default: 0 }
    }]
});

export default mongoose.model("Factura", facturaSchema);
