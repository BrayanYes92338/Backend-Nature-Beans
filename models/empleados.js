import mongoose from "mongoose";

const EmpleadoSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    correo:{type:String,required:true},
    documento:{type:String,required:true},
    direccion:{type:String,required:true},
    telefono:{type:String,required:true},
    estudios:{type:String,required:true},
    descripcion:{type:String,required:true}
})


export default mongoose.model("Empleado",EmpleadoSchema)