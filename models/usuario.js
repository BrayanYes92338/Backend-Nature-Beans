import mongoose from "mongoose";

const UsuarioSchema=new mongoose.Schema({
    nombre:{type:String,required:true},
    direccion:{type:String,required:true},
    documento:{type:String,required:true, unique:true},
    correo:{type:String,required:true},
    password:{type:String,required:true},
    telefono:{type:String,required:true},
    rol:{type:String,required:true},
    municipio:{type:String,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Usuario", UsuarioSchema)