import mongoose from "mongoose";
const dbConexion = async ()=>{
    try {
        await mongoose.connect(process.env.CNX_MONGO);
        console.log("Conexion bd establecida");
        
    } catch (error) {
        console.log("Error al conectar la base de datos");
        
    }
} 

export default dbConexion