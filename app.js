import express from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import cors from "cors"
import usuarios from "./routes/usuario.js"
import proveedor from "./routes/proveedor.js"
import finca from "./routes/finca.js"
import empleado from "./routes/empleado.js"
import cultivo from "./routes/cultivo.js"
import clima from "./routes/clima.js"
import nomina from "./routes/nomina.js"
import parcela from "./routes/parcela.js"
import proceso from "./routes/proceso.js"




const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/usuarios",usuarios)
app.use("/api/proveedor", proveedor)
app.use('/api/fincas', finca)
app.use('/api/empleado', empleado)
app.use('/api/cultivo', cultivo)
app.use("/api/clima",clima)
app.use("/api/nomina",nomina)
app.use("/api/parcela",parcela)
app.use("/api/proceso",proceso)




app.listen(process.env.PORT, async () =>{
    await dbConexion()
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })