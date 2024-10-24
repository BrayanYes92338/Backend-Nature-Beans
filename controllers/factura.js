import Factura from "../models/factura.js";
import Produccion from "../models/produccion.js";

const httpFactura = {
  getFactura: async (req, res) => {
    const { buscar } = req.query;
    const factura = await Factura.find({
    })
      .populate({
        path: "idComprador",
      })
      .populate({
        path: "detalle.idProduccion",
      });
    res.json({ factura });
  },
  getFacturaID: async (req, res) => {           
    const { id } = req.params;                        
    const factura = await Factura.findById(id);
    res.json({ factura });     
  },
  getFacturaFechas: async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;

    if (!fechaInicio || !fechaFin) {
      return res
        .status(400)
        .json({ mensaje: "Por favor proporciona las fechas de inicio y fin" });
    }

    try {
      const documentos = await Factura.find({
        fecha: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin),
        },
      });

      if (documentos.length === 0) {
        res.json({
          message: "No se encontro ninguna Factura entre esas fechas",
        });
      } else {
        res.json({
          msg: `Se encontro entre las fechas ${fechaInicio} y ${fechaFin} las siguientes Facturas`,
          data: documentos,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "No se pudo realizar la peticion" });
    }
  },
  getFacturaValor: async (req, res) => {
    let acum = 0;

    const totalfac = await Factura.find();

    for (let i = 0; i < totalfac.length; i++) {
      const element = totalfac[i];
      acum = acum + element.total;
    }

    res.json({
      msg: `El valor total de las facturas es ${acum}`,
      data: totalfac,
    });
  },
  postFactura: async (req, res) => {
    const { idComprador, loteComercialnum, detalle } = req.body;

    let total = 0; 

    for (const a of detalle) {   
        let stock = 0;
    
        if (a.idProduccion) {
            const pro = await Produccion.findById(a.idProduccion);

            if (a.cantidad <= pro.cantidad) {                  
                a.nombreProducto = pro.producto;  

                let subtotal = a.precio * a.cantidad;
                a.subtotal = subtotal;

                let iv = subtotal * a.iva / 100; 
                total += subtotal + iv; 

                stock = pro.cantidad - a.cantidad;
                pro.cantidad = stock;
                await pro.save();
            } else {
                return res.status(400).json({ msg: `No hay suficiente stock para el producto ${pro.producto}` });
            }
        }
    }

    const factura = new Factura({ idComprador, loteComercialnum, total, detalle });
    await factura.save();
    res.json({ factura });
},

  putFactura: async (req, res) => {
    const { id } = req.params;
    const { idComprador, ...resto } = req.body;
    const factura = await Factura.findByIdAndUpdate(
      id,
      { idComprador, ...resto },
      { new: true }        
    );
    res.json({ factura });
  },
};

export default httpFactura;
