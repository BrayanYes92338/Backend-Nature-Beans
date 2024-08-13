import Siembra from '../models/siembra.js';

const helperSiembra = {

    validarSiembraID: async (id) =>{
        const existe = await Siembra.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Siembra no existe")
        }
    }
}

export default helperSiembra;