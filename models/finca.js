import mongoose from "mongoose";

const fincaSchema = new mongoose.Schema({
    idUsuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
    nombre:{type:String,required:true},
    ruc:{type:Number,required:true},
    ciudad:{type:String,required:true},
    limites:[{
        norte:{type:String,default:""},
        sur:{type:String,default:""},
        este:{type:String,default:""},
        oeste:{type:String,default:""},
    }],
    departamento:{type:String,required:true},
    direccion:{type:String,required:true},
    ubicacion:{type:String,required:true},
    area:{type:String,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model('Finca',fincaSchema);
