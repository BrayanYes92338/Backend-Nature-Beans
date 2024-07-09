import Nomina from '../models/nomina.js'

const helperNomina={
    validarNominaID: async (id) =>{
        const existe = await Nomina.findById(id);
        if(existe == undefined){
            throw new Error("Id del registro de Nomina  no existe")
        }
    }
}

export default helperNomina