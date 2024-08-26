import mongoose from "mongoose";

const insumoSchema=new mongoose.Schema({
    IdProveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
    idReponsable:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    nombre:{type:String,required:true},
    fecha:{type:Date, default:Date.now},
    relacionNPK:{type:String,required:true},
    cantidad:{type:Number,default:0},
    unidad:{type:String,required:true},
    observaciones:{type:String,required:true},
    total:{type:Number,required:true},
})

export default mongoose.model("Insumo",insumoSchema)