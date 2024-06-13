import Usuario from '../models/usuario.js'

const helperUsuario ={
    documentoUnico:async(documento)=>{
        const existe = await Usuario.findOne({documento})
        if (existe) {
            throw new Error("Este Documento ya existe");
          }
    },
    validarExistaUsuarioId: async (id) => {
        const existe = await Usuario.findById(id);
        if (existe == undefined) {
          throw new Error("Id del Usuario no existe");
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
          const existe = await Usuario.findOne({correo})
          if(!existe) throw new Error('El correo no existe dentro de la base de Datos')
        }
      }

}

export default helperUsuario