import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema({
    nombre:{type: String,required:true},
    direccion:{type: String,required:true},
    telefono:{type: String,required:true},
    correo:{type: String,required:true, unique:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Proveedor", ProveedorSchema)
