import express from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import usuarios from "./routes/usuario.js"
import proveedor from "./routes/proveedor.js"
import finca from "./routes/finca.js"
import clima from "./routes/clima.js"
import empleado from "./routes/empleado.js"
import nomina from "./routes/nomina.js"


const app = express()
app.use(express.json())
app.use("/api/usuarios",usuarios)
app.use("/api/proveedor", proveedor)
app.use('/api/fincas', finca)
app.use("/api/clima",clima)
app.use("/api/empleado",empleado)
app.use("/api/nomina",nomina)


app.listen(process.env.PORT, async () =>{
    await dbConexion()
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })