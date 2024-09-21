import mongoose from "mongoose";

const gastosSchema=new mongoose.Schema({
    idFinca:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Finca"},
    nombre:{type:String,required:true},
    semillas:[{
        idSemilla:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Semilla"},
        idProveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
        unidad:{type:String,default:0},
        cantidad:{type:Number,default:0},
        precio:{type:Number,default:0},
        total:{type:Number,default:0},
    }],
    insumo:[{
        idInsumo:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Insumo"},
        idProveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
        unidad:{type:String,default:0},
        total:{type:Number,default:0},
        cantidad:{type:Number,default:0},
    }],
    numerofactura:{type:String,unique:true,required:true},
    descripcion:{type:String,required:true},
    fecha:{type:Date, default:Date.now},
})

export default mongoose.model("Gasto",gastosSchema)