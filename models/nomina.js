import mongoose from "mongoose";

const nominaSchema=new mongoose.Schema({
    idEmpleado:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    fecha:{type:Date, default:Date.now},
    tipo:{type:String,required:true},
    valor:{type:Number,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Nomina",nominaSchema)