import MaquinariaHerramientas from "../models/maquinariaHerramientas.js";

const httpmaquinariaHerramientas = {

    getMaquinariaHerramientas: async(req, res)=>{
        const {buscar} = req.query;
        const maquinas = await MaquinariaHerramientas.find({
            $or:[{tipo: new RegExp(buscar, "i")}]
        })
        res.json({maquinas})
    },
    getMaquinariaHerramientasID: async (req ,res)=>{
        const {id}= req.params;
        const finca = await MaquinariaHerramientas.findById(id);
        res.json({finca})
    },
    getMaquinariaHerramientasFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await MaquinariaHerramientas.find({
                fechaCompra: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se compro ninguna Maquina o Herramienta entre esas fechas"})
            }else{
       
            res.json({msg:`Se compraron entre las fechas ${fechaInicio} y ${fechaFin} las siguientes Maquinas o Herramientas`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
        getMaquinariaHerramientasCantidad: async (req, res) => {

            let acum = 0
        
            const maquinas = await MaquinariaHerramientas.find();
        
            for (let i = 0; i < maquinas.length; i++) {
              const element = maquinas[i];
              acum = acum + element.cantidad
            }
        
            res.json({msg:`El total de maquinas y herramientas compradas son ${acum}`, data: maquinas});
          },
    postMaquinariaHerramientas: async (req, res)=>{
        try{
            const {idProveedor,nombre,tipo,observaciones,cantidad,precio} = req.body;

           const totl = cantidad * precio

            const maquinas = new MaquinariaHerramientas({idProveedor,nombre,tipo,observaciones,cantidad,precio,total: totl})
            await maquinas.save()
            res.json({maquinas})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar la maquinaria o herramienta'})
        }
    },
    putMaquinariaHerramientas: async (req ,res)=>{
        const {id}=req.params;
        const {idProveedor,...resto} = req.body;
        const maquinas = await MaquinariaHerramientas.findByIdAndUpdate(id, {idProveedor, ...resto}, {new:true})
        res.json({maquinas})
    },
}

export default httpmaquinariaHerramientas;