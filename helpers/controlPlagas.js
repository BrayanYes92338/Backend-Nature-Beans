import ControlPlaga from '../models/controlPlagas.js'

const helperControlPlaga={
    validarControlPlagaID: async (id) =>{
        const existe = await ControlPlaga.findById(id);
        if(existe == undefined){
            throw new Error("Id del registro del Control de Plaga  no existe")
        }
    }
}

export default helperControlPlaga