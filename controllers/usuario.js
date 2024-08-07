import Usuario from "../models/usuario.js"
import { generarJWT } from "../middleware/validar-jwt.js";
import bcryptjs from 'bcryptjs'

const httpUsuarios = {
    getUsuarios: async (req, res) => {
        const { busqueda } = req.query;
        const usuario = await Usuario.find({
            $or: [{ nombre: new RegExp(busqueda, "i") }]
        });
        res.json({ usuario })
    },
    getUsuariosID: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        res.json({ usuario });
    },
 
    getUsuarioAdmin: async (req, res) =>{
      const usuario = await Usuario.find({rol: "ADMIN"})
      res.json({ usuario })
    },

    getUsuariosActivo: async (req, res) => {
        const usuarios = await Usuario.find({ estado: 1 })
        res.json({ usuarios })
    },
    getUsuariosInactivo: async (req, res) => {
        const usuarios = await Usuario.find({ estado: 0 })
        res.json({ usuarios })
    },
    postUsuarios: async (req, res) => {
        try {
            const salt = bcryptjs.genSaltSync(10)
            const { nombre, direccion, documento, correo, password, telefono, rol, municipio } = req.body;

            const usuarios = new Usuario({ nombre, direccion, documento, correo, password, telefono, rol, municipio })

            usuarios.password = bcryptjs.hashSync(password, salt)
         await usuarios.save();
            res.json({ usuarios })
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Error no se pudo crear el Usuario" })
        }

    },
    putUsuarios: async (req, res)=>{
        const { id } = req.params;
        const {nombre,...resto} = req.body;
        const usuarios = await Usuario.findByIdAndUpdate(id, {nombre, ...resto}, {new: true});
        res.json({usuarios})
    },
    putUsuariosActivar: async (req,res) =>{
        const { id } = req.params;
        const usuarios = await Usuario.findByIdAndUpdate(id, {estado: 1}, {new: true});
        res.json({ usuarios });
      },
      putUsuariosDesactivar: async (req,res) =>{
        const { id } = req.params;
        const usuarios = await Usuario.findByIdAndUpdate(id, {estado: 0}, {new: true});
        res.json({ usuarios });
      },
      login: async (req, res)=>{
        const {documento, password} = req.body;
        try{
            const user = await Usuario.findOne({documento});

            if(!user){
                return res.status(401).json({
                  msg: "Usuario/Contraseña no son  correctos/No esta agregado a la base de datos"
                })
              }
        
              if(user.estado === 0){
                return res.status(401).json({
                  msg: "Usuario/Contraseña no son  correctos/ No esta activo"
                })
              }
        
              const validPassword = bcryptjs.compareSync(password,user.password);
              if(!validPassword){
                return res.status(401).json({
                  msg: "Usuario/Contraseña no son  correctos/contra incorrecta"
                })
              }
        
              const token = await generarJWT(user._id); // Generación del token JWT
              res.json({
                  usuario: user,
                  token
              });

        }catch(error){
            return res.status(500).json({
                msg: "Error al iniciar sesion, Hable con el Administrador"
              })
        }
      }

}

export default httpUsuarios