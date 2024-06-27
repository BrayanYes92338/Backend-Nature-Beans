import Parcela from '../models/parcela.js'

const httpParcela = {
    getParcela: async (req, res) => {
        const { buscar } = req.query;
        const parcelas = await Parcela.find({
            $or: [{ ubicacion: new RegExp(buscar, "i") }]
        })
            .populate({
                path: 'idFinca'
            })
            .populate({
                path: 'asistenteTecnico'
            })
        res.json({ parcelas })

    },
    getParcelaID: async (req, res) => {
        const { id } = req.params;
        const parcela = await Parcela.findById(id);
        res.json({ parcela })
    },
    postParcela: async (req, res)=>{
        try{
            const {idFinca,asistenteTecnico,ubicacion,numero,cultivoAnterior,cultivoActual,detalle,area} = req.body;
            const parcelas = new Parcela({idFinca,asistenteTecnico,ubicacion,numero,cultivoAnterior,cultivoActual,detalle,area})
            await parcelas.save()
            res.json({parcelas})
        }catch (error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar Parcela'})
        }
    },
    putParcela: async (req, res)=>{
        const {id} = req.params;
        const {idFinca, ...resto} = req.body;
        const parcelas = await Parcela.findByIdAndUpdate(id,{idFinca, ...resto}, {new:true})
        res.json({parcelas})
    },
    putParcelaActiva: async (req, res)=>{
        const {id} = req.params;
        const parcela = await Parcela.findByIdAndUpdate(id, {estado: 1}, {new:true})
        res.json({parcela})
    },
    putParcelaInactiva: async (req,res )=>{
        const {id} = req.params;
        const parcela = await Parcela.findByIdAndUpdate(id, {estao: 0}, {new:true})
        res.json({parcela})
    }


}

export default httpParcela