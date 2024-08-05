import Cultivo from '../models/cultivo.js'

const helperCultivo ={

    validarExistaCultivoId: async (id) => {
        const existe = await Cultivo.findById(id);
        if (existe == undefined) {
          throw new Error("Id del regisrtro del Cultivo no existe");
        }
      },

}

export default helperCultivo