import mongoose from "mongoose";

const analisisSueloSchema=new mongoose.Schema({
    idParcela:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Parcela"},
    idEmpleado:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    muestra:{type:String,required:true},
    cultivo:{type:String,required:true},
    laboratorio:{type:String,requerid:true},
    resultados:[{}],
    recomendaciones:{type:String},
    createdAt:{type:Date,default:Date.now},
})

export default mongoose.model("AnalisisSuelo",analisisSueloSchema)