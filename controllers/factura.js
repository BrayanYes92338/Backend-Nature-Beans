import Factura from "../models/factura.js";

const httpFactura ={

    getFactura: async (req, res)=>{
        const {buscar} = req.query;
        const fact = await Factura.find({
            $or:[{nombreProducto: new RegExp(buscar, "i")}]
        })
        .populate({
            path:'idInventario'
        });
        res.json({fact})
    },
    getFacturaID: async (req ,res)=>{
        const {id}= req.params;
        const factura = await Factura.findById(id);
        res.json({factura})
    },
    getFacturaFechas: async (req,res) => {

        const { fechaInicio, fechaFin } = req.body;
       
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
        }
       
        try {
            const documentos = await Factura.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            })
            
       
            if(documentos.length === 0) {
                res.json({ message: "No se encontro ninguna Factura entre esas fechas"})
            }else{
       
            res.json({msg:`Se encontro entre las fechas ${fechaInicio} y ${fechaFin} las siguientes Facturas`, data: documentos});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
       
        },
        getFacturaValor: async (req, res) => {

            let acum = 0
        
            const totalfac = await Factura.find();
        
            for (let i = 0; i < totalfac.length; i++) {
              const element = totalfac[i];
              acum = acum + element.total
            }
        
            res.json({msg:`El valor total de las facturas es ${acum}`, data: totalfac});
          },
    postFactura: async (req, res)=>{
        try{
            const {idInventario,idComprador,loteComercialnum,nombreProducto,precio,cantidad,iva} = req.body;

            const subtotl = precio * cantidad

            const iv = subtotl*iva/100

            const totl = subtotl+iv
            
            const factura = new Factura({idInventario,idComprador,loteComercialnum,nombreProducto,precio,cantidad,iva,subtotal:subtotl,total:totl})
            await factura.save()
            res.json({factura})

        }catch(error){
            console.log(error)
            res.status(400).json({msg: 'Error no se pudo agregar factura'})
        }
    },
    putFactura: async (req ,res)=>{
        const {id}=req.params;
        const {idInventario,...resto} = req.body;
        const factura = await Factura.findByIdAndUpdate(id, {idInventario, ...resto}, {new:true})
        res.json({factura})
    },
}


export default httpFactura;