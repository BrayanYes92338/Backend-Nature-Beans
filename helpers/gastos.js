import Gastos from '../models/gastos.js';

const helperGastos = {

    validarGastosID: async (id) =>{
        const existe = await Gastos.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Gastos no existe")
        }
    }
}

export default helperGastos;