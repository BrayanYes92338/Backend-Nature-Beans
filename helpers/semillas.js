import Semillas from "../models/semillas.js";

const helperSemillas = {

    validarSemillaID: async (id) =>{
        const existe = await Semillas.findById(id);
        if(existe == undefined) {
            throw new Error("Id de la Semilla no existe")
        }
    }
}

export default helperSemillas;