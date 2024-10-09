import mongoose from "mongoose";

const PreparacionSueloSchema = new mongoose.Schema({
    fecha:{type:Date, default:Date.now},
    idParcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    idEmpleadooperario:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    productos:[{  
        ingredienteActivo:{type:String,required:true},
        dosis:{type:String,required:true},
        metodoAplicacion:{type:String,required:true},
    }],
    observaciones:{type:String,required:true},
})


export default mongoose.model("PreparacionSuelo", PreparacionSueloSchema)      