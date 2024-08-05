import Empleado from '../models/empleado.js'

const helperEmpleado = {
  documentoUnico: async (documento) => {
    const existe = await Empleado.findOne({ documento })
    if (existe) {
      throw new Error("Este Documento ya existe");
    }
  },
  validarExistaEmpleadoId: async (id) => {
    const existe = await Empleado.findById(id);
    if (existe == undefined) {
      throw new Error("Id del Empleado no existe");
    }
  },

  CorreoUnico: async (correo) => {
    const existe = await Empleado.findOne({ correo })
    if (existe) {
      throw new Error("Este Correo ya existe");
    }
  },


}

export default helperEmpleado