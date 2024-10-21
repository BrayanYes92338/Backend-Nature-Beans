import MaquinariaHerramientas from "../models/maquinariaHerramientas.js";


const httpmaquinariaHerramientas = {

    getMaquinariaHerramientas: async (req, res) => {
        try {
            const { buscar } = req.query;
            const maquinas = await MaquinariaHerramientas.find({
                $or: [{ tipo: new RegExp(buscar, "i") }]
            })
            .populate({
                path: 'idProveedor'  // Popula el proveedor
            })
            .populate({
                path: 'desinfeccion.idEmpleado',  // Popula el empleado en desinfección
               
            })
            .populate({
                path: 'desinfeccion.idInsumo',  // Popula el insumo en desinfección
                
            });
    
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener maquinaria y herramientas' });
        }
    },
    getMaquinariaHerramientasID: async (req, res) => {
        const { id } = req.params;
        const finca = await MaquinariaHerramientas.findById(id);
        res.json({ finca })
    },
    getMaquinariaHerramientasFechas: async (req, res) => {

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


            if (documentos.length === 0) {
                res.json({ message: "No se compro ninguna Maquina o Herramienta entre esas fechas" })
            } else {

                res.json({ msg: `Se compraron entre las fechas ${fechaInicio} y ${fechaFin} las siguientes Maquinas o Herramientas`, data: documentos });
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

        res.json({ msg: `El total de maquinas y herramientas compradas son ${acum}`, data: maquinas });
    },
    postMaquinariaHerramientas: async (req, res) => {
        try {
            const { idProveedor, nombre, tipo, observaciones, cantidad, precio, mantenimiento, desinfeccion } = req.body;

            const totl = cantidad * precio

            const maquinas = new MaquinariaHerramientas({ idProveedor, nombre, tipo, observaciones, cantidad, precio, mantenimiento, desinfeccion, total: totl })
            await maquinas.save()

            res.json({ maquinas })



        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: 'Error no se pudo agregar la maquinaria o herramienta' })
        }
    },
    putMaquinariaHerramientas: async (req, res) => {
        try {
            const { id } = req.params;
            const { cantidad, precio, idProveedor, ...resto } = req.body;

            // Calcular el nuevo total
            const total = cantidad && precio ? cantidad * precio : undefined;

            // Si hay un nuevo total, añadirlo al objeto de actualización
            const updateData = total ? { ...resto, cantidad, precio, total } : { ...resto, cantidad, precio };

            // Actualizar la maquinaria
            const maquinas = await MaquinariaHerramientas.findByIdAndUpdate(id, updateData, { new: true });
            res.json({ maquinas });
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: 'Error al actualizar la maquinaria o herramienta' });
        }
    },

}

export default httpmaquinariaHerramientas;