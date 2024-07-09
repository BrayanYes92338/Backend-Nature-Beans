import mongoose from "mongoose";

const climaSchema=new mongoose.Schema({
    idFinca: {type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true},
    idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
    tipoClima:{type:String,required:true},
    horaInicio:{type:String,required:true},
    horaFinal:{type:String,required:true},
    tempMin:{type:String,required:true},
    tempMax:{type:String,required:true},
    estado:{type:Number,default:1},
    createAt: {type: Date, default: Date.now},
    
})

export default mongoose.model("Clima",climaSchema)