import Gastos from '../models/gastos.js';

const helperGastos = {

    validarGastosID: async (id) =>{
        const existe = await Gastos.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Gastos no existe")
        }
    },
    validarNumFacturaUnico: async (numerofactura) => {
        const existe = await Gastos.findOne({ numerofactura });
        if (existe) {
          throw new Error("Este numerofactura ya existe en la base de datos");
        }
    },
}

export default helperGastos;