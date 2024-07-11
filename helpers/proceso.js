import Proceso from '../models/proceso.js'

const helperProceso ={

    validarExistaProcesoId: async (id) => {
        const existe = await Proceso.findById(id);
        if (existe == undefined) {
          throw new Error("Id del regisrtro del proceso no existe");
        }
      },

}

export default helperProceso