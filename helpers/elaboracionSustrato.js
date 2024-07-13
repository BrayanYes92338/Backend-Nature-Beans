import Sustrato from '../models/elaboracionSustrato.js'


const helperSustrato={
    validarSustratoID: async (id) =>{
        const existe = await Sustrato.findById(id);
        if(existe == undefined){
            throw new Error("Id del registro de la Elaboracion deSustrato  no existe")
        }
    }
}

export default helperSustrato