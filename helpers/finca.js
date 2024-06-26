import Finca from '../models/finca.js';

const helperFinca = {

    validarFincaID: async (id) =>{
        const existe = await Finca.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Finca no existe")
        }
    }
}

export default helperFinca;