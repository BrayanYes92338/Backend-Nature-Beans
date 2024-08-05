import MaquinariaHerramientas from "../models/maquinariaHerramientas.js";

const helpermaquinariaHerramientas = {

    validarmaquinariaHerramientasID: async (id) =>{
        const existe = await MaquinariaHerramientas.findById(id);
        if(existe == undefined) {
            throw new Error("Id de la Maquinaria o de la Herramienta no existe")
        }
    }
}

export default helpermaquinariaHerramientas;