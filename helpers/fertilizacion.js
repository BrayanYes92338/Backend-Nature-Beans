import Fertilizacion from '../models/fertilizacion.js';

const helperFertilizacion = {

    validarFertilizacionID: async (id) =>{
        const existe = await Fertilizacion.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Fertilizacion no existe")
        }
    }
}

export default helperFertilizacion;