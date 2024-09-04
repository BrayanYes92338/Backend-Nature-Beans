import Insumo from "../models/insumos.js"

const helperInsumo = {

validarInsumoID: async (id)=>{
    const existe = await Insumo.findById(id);
    if(existe == undefined){
        throw new Error("Id del registro del insumo no existe")
            } 
}

}

export default helperInsumo;