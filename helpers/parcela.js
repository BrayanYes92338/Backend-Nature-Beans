import Parcela from "../models/parcela.js";

const helperParcela ={

    validarExistaParcelaID: async (id) => {
        const existe = await Parcela.findById(id);
        if (existe == undefined) {
            throw new Error("Id de la Parcela no existe")
        }
    },

    validarNumeroParcela: async (numero)=>{
        const existe = await Parcela.findOne({numero})
        if (existe) {
            throw new Error("Este Numero de Parcela ya existe")
        }
    }


}

export default helperParcela