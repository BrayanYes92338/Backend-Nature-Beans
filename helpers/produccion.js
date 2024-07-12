import Produccion from "../models/produccion.js";

const helperProduccion = {
    validarExistaProduccionId: async (id) => {
        const existe = await Produccion.findById(id);
        if (existe == undefined) {
          throw new Error("Id del Produccion no existe");
        }
      },
}

export default helperProduccion