import mongoose from "mongoose";

const insumoSchema=new mongoose.Schema({
    IdProveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
    idReponsable:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    nombre:{type:String,required:true},
    fecha:{type:Date, default:Date.now},
    relacionNPK:{type:String,required:true},
    cantidad:{type:Number,default:0},
    precio:{type:Number,required:true},
    observaciones:{type:String,required:true},
    unidad:{type:String,default:0},
    total:{type:Number,default:0},
})

export default mongoose.model("Insumo",insumoSchema)