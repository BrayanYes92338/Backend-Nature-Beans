import mongoose from "mongoose";

const PreparacionSueloSchema = new mongoose.Schema({
    fecha:{type:Date, default:Date.now},
    idParcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    idEmpleadooperario:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    productos:[{  
        ingredienteActivo:{type:String,default:""},
        dosis:{type:String,default:""},
        metodoAplicacion:{type:String,default:""},
    }],
    observaciones:{type:String,required:true},
})


export default mongoose.model("PreparacionSuelo", PreparacionSueloSchema)      