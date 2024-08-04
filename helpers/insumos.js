import Proveedor from '../models/proveedor.js'
import Empleado from '../models/empleado.js'


const helpersInsumo = {

     
      validarEmpleadoId: async (id) => {
        const existe = await Empleado.findById(id);
        if (existe == undefined) {
          throw new Error("Id de el empleado no existe");
        }
      },
      validarProveedorId: async (id) => {
        const existe = await Proveedor.findById(id);
        if (existe == undefined) {
          throw new Error("Id de el Proveedor no existe");
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
export default helpersInsumo;