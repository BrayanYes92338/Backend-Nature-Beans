import Comprador from '../models/comprador.js'
import Produccion from '../models/produccion.js'


const helpersComprador = {

      validarCompradorId: async (id) => {
        const existe = await Comprador.findById(id);
        if (existe == undefined) {
          throw new Error("Id no existe");
        }
      },
      validarProduccionId: async (id) => {
        const existe = await Produccion.findById(id);
        if (existe == undefined) {
          throw new Error("Id de produccion no existe");
        }
      },
      validarCodigoUnico: async (nguiaTransporte) => {
        const existe = await Comprador.findOne({ nguiaTransporte });
        console.log(existe);
        if (existe) {
          throw new Error("el nguiaTransporte  ya existes");
        }
},
validarCodigoUnicoEditar: async (nguiaTransporte, { req }) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("El ID de la solicitud no está definido.");
  }
  const codigos = await Comprador.findOne({ nguiaTransporte });
  if (codigos && codigos.id && codigos.id.toString() !== id.toString()) {
    throw new Error("El nguiaTransporte ya existe");
  }
},

}
export default helpersComprador;