import Gastos from "../models/gastos.js"
import Insumo from "../models/insumos.js";
import Semilla from "../models/semillas.js";
import MaquinariaHerramientas from "../models/maquinariaHerramientas.js";

const httpGastos = {

    getGastos: async (req, res)=>{
        const {buscar} = req.query;
        const siem = await Gastos.find({
            $or:[{numerofactura: new RegExp(buscar, "i")}]
        })
        res.json({siem})
    },
    getGastosID: async (req ,res)=>{
        const {id}= req.params;
        const siem = await Gastos.findById(id);
        res.json({siem})
    },
    getGastosEntreFechas: async (req,res) => {

        let acum = 0
   
       const { fechaInicio, fechaFin } = req.body;
   
       if (!fechaInicio || !fechaFin) {
           return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
       }
   
       try {
           const documentos = await Gastos.find({
               fecha: {
                   $gte: new Date(fechaInicio),
                   $lte: new Date(fechaFin)
               }
           })
           
   
           if(documentos.length === 0) {
               res.json({ message: "No se encontro ningun gasto entre esas fechas"})
           }else{
               
           for (let i = 0; i < documentos.length; i++) {
               const element = documentos[i];
               acum = acum + element.total
           }
   
           res.json({msg:`El valor de los gastos entre las fechas ${fechaInicio} y ${fechaFin} es de ${acum} pesos`, data: documentos});
           }
       } catch (error) {
           console.error(error);
           res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
       }
   
       },
       getGastosTotal: async (req,res) => {

        try {
            let acum = 0

            const totl = await Gastos.find({})
    
            for (let i = 0; i < totl.length; i++) {
                const element = totl[i];
                acum = acum + element.total
            }
            res.json({ msg:`Los gastos totales son ${acum} pesos`, data:totl })  

        } catch (error) {
           console.error(error);
           res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    postGastos: async (req, res)=>{
        try{
            const {idInsumo,idSemilla,idMantenimiento,nombre,numerofactura,descripcion} = req.body;

            const tins = await Insumo.findById(idInsumo);
            const tsem = await Semilla.findById(idSemilla);
            const tman = await MaquinariaHerramientas.findById(idMantenimiento);

            const totl = tins.total + tsem.total + tman.total
            console.log(totl);
            

            const siem = new Gastos({idInsumo,idSemilla,idMantenimiento,nombre,numerofactura,descripcion,total:totl}) 
            await siem.save()
            res.json({siem})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar la Gastos'})
        }
    },
    putGastos: async (req ,res)=>{
        const {id}=req.params;
        const {idInsumo,...resto} = req.body;
        const siem = await Gastos.findByIdAndUpdate(id, {idInsumo, ...resto}, {new:true})
        res.json({siem})
    },
}

export default httpGastos;