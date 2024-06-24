import Empleado from '../models/empleados.js'

const helperEmpleado ={
    documentoUnico:async(documento)=>{
        const existe = await Empleado.findOne({documento})
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
      noExisteDocumento: async(documento)=>{
        if(documento){
          const existe = await Usuario.findOne({documento})
          if(!existe) throw new Error('El Documento no existe dentro de la base de Datos')
        }
      },
      noExisteCorreo: async(correo)=>{
        if(correo){
          const existe = await Empleado.findOne({correo})
          if(!existe) throw new Error('El correo no existe dentro de la base de Datos')
        }
      }

}

export default helperEmpleado