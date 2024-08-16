import Factura from '../models/factura.js';

const helperFactura = {

    validarFacturaID: async (id) =>{
        const existe = await Factura.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Factura no existe")
        }
    }
}

export default helperFactura;