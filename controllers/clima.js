import Clima from "../models/clima.js"


const httpClima = {
    getClima: async (req, res) => {
        const { busqueda } = req.query;
        const clima = await Clima.find({
            $or: [{ horaInicio: new RegExp(busqueda, "i") }]
        })
        .populate({
            path: 'idEmpleado'
        }) .populate({
            path: 'idFinca'
        });
        res.json({ clima })

    },
    getClimaID: async (req, res) => {
        const { id } = req.params;
        const climas = await Clima.findById(id);
        res.json({ climas })
    },
    getClimaActivo: async (req, res) => {
        const climaActivo = await Clima.find({ estado: 1 })
        res.json({ climaActivo })
    },
    getClimaInactivo: async (req, res) => {
        const climaInactivo = await Clima.find({ estado: 0 })
        res.json({ climaInactivo })
    },
    getClimaTipo: async (req,res) => {
        try {
            const { tipoClima } = req.params;
            const ti = await Clima.find({tipoClima})
            res.json(ti)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se encontro el tipo de clima' });
        }
    },
    getClimaFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await Clima.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ningun clima entre esas fechas"})
            }else{
       
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} los siguientes climas`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
    postClima: async (req, res) => {
        try {
            const { idFinca, idEmpleado, tipoClima, horaInicio, horaFinal, tempMin, tempMax } = req.body;
            const climas = new Clima({ idFinca, idEmpleado, tipoClima, horaInicio, horaFinal, tempMin, tempMax })
            await climas.save()
            res.json({ climas })

        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: 'Error no se pudo agregar datos del clima' })
        }
    },
    putClima: async (req, res) => {
        const { id } = req.params;
        const { idFinca, ...resto } = req.body;
        const climas = await Clima.findByIdAndUpdate(id, { idFinca, ...resto }, { new: true })
        res.json({ climas })
    },
    putClimaActivos: async (req, res) => {
        const { id } = req.params;
        const climas = await Clima.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ climas })
    },
    putClimaInactivos: async (req, res) => {
        const { id } = req.params;
        const climas = await Clima.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ climas })
    },

}

export default httpClima