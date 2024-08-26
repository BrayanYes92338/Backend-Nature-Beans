import Comprador from '../models/comprador.js'



const helpersComprador = {

  validarCompradorId: async (id) => {
    const existe = await Comprador.findById(id);
    if (existe == undefined) {
      throw new Error("Id  del comprador no existe");
    }
  },

  validarCodigoUnico: async (nguiaTransporte) => {
    const existe = await Comprador.findOne({ nguiaTransporte });
    console.log(existe);
    if (existe) {
      throw new Error("el nguiaTransporte  ya existe");
    }
  },


  validarDocumento: async (documento) => {
    const existe = await Comprador.findOne({ documento });
    console.log(existe);
    if (existe) {
      throw new Error("el documento  ya existe");
    }
  },

}
export default helpersComprador;