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
import produccion from "./routes/produccion.js"
import analisis from "./routes/analisisSuelo.js"
import preparacion from "./routes/preparacionSuelo.js"
import sustrato from "./routes/elaboracionSustrato.js"
import riego from "./routes/riego.js"
import controlPlaga from "./routes/controlPlagas.js"
import maquinariaHerramienta from "./routes/maquinariaHerramientas.js"
import semilla from "./routes/semillas.js"
import insumo from "./routes/insumos.js"
import comprador from "./routes/comprador.js"



const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/usuarios",usuarios)
app.use("/api/proveedor", proveedor)
app.use('/api/fincas', finca)
app.use('/api/empleado',empleado)
app.use('/api/cultivo',cultivo)
app.use("/api/clima",clima)
app.use("/api/nomina",nomina)
app.use("/api/parcela",parcela)
app.use("/api/proceso",proceso)
app.use("/api/produccion",produccion)
app.use("/api/analisis",analisis)
app.use("/api/preparacion",preparacion)
app.use("/api/sustrato",sustrato)
app.use("/api/riego",riego)
app.use("/api/controlPlaga",controlPlaga)
app.use("/api/maquinariaHerramientas",maquinariaHerramienta)
app.use("/api/semilla",semilla)
app.use("/api/comprador",comprador)
app.use("/api/insumo",insumo)






app.listen(process.env.PORT, async () =>{
    await dbConexion()
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })