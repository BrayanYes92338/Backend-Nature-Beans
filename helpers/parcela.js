import Parcela from '../models/parcela.js'

const helperParcela = {

    ValidarParcelaID: async (id)=>{
        const existe = await Parcela.findById(id);
        if(existe == undefined){
            throw new Error("Id de la Parcela no existe")
            
            }
    }

}

export default helperParcela