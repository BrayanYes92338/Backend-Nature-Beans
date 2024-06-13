import mongoose from "mongoose";

const fincaSchema = new mongoose.Schema({
    idUsuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
    nombre:{type:String,required:true},
    ruc:{type:Number,required:true},
    ciudad:{type:String,required:true},
    limites:[{
        norte:{type:String,required:true},
        sur:{type:String,required:true},
        este:{type:String,required:true},
        oeste:{type:String,required:true},
    }],
    departamento:{type:String,required:true},
    direccion:{type:String,required:true},
    ubicacion:{type:String,required:true},
    area:{type:String,required:true}
})


export default mongoose.model("Finca",fincaSchema)
