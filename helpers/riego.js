import Riego from '../models/riego.js'

const helperRiego={
    validarRiegoID: async (id) =>{
        const existe = await Riego.findById(id);
        if(existe == undefined){
            throw new Error("Id del registro de riego  no existe")
        }
    }
}

export default helperRiego