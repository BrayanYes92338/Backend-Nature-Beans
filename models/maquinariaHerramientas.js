import mongoose from "mongoose";

const maquinariaSchema=new mongoose.Schema({
    idProveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    observaciones:{type:String,required:true},
    cantidad:{type:Number,required:true},
    precio:{type:Number,required:true},
    total:{type:Number,default:0},
    mantenimiento:[{
        fechaMantenimiento:{type:Date, default:Date.now},
        responsable:{type:String,required:true},
        observaciones:{type:String,required:true},
        precioMantenimiento:{type:Number,required:true},
    }],
    desinfeccion:[{
        fechaDesifeccion:{type:Date, default:Date.now},
        idEmpleado:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
        productos:[{
            idInsumo:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Insumo"},
        }],
    }],
    fechaCompra:{type:Date, default:Date.now}
})

export default mongoose.model("Maquinaria",maquinariaSchema)