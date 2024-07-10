import Parcela from '../models/parcelas.js'

const helpersParcela = {

    validarNumeroUnico: async (numero) => {
        const existe = await Parcela.findOne({ numero });
        if (existe) {
          throw new Error("Este numero ya existe");
        }
      },
      validarParcelaId: async (id) => {
        const existe = await Parcela.findById(id);
        if (existe == undefined) {
          throw new Error("Id no existe");
        }
      },
}

export default helpersParcela;