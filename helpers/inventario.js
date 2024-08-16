import Inventario from "../models/inventarios.js";

const helperInventario = {

    validarInventarioID: async (id) =>{
        const existe = await Inventario.findById(id);
        if(existe == undefined) {
            throw new Error("Id del Inventario no existe")
        }
    }
}

export default helperInventario;