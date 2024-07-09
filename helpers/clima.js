import Clima from '../models/clima.js'

const helperClima={
    validarClimaID: async (id) =>{
        const existe = await Clima.findById(id);
        if(existe == undefined){
            throw new Error("Id del registro de clima  no existe")
        }
    }
}

export default helperClima