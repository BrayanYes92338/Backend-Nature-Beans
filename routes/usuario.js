import {Router} from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from '../middleware/validar-rol.js'
import httpUsuarios from '../controllers/usuario.js'
import helperUsuario from '../helpers/usuario.js'

const router = Router()

router.get('/',[
    validarCampos
  ],httpUsuarios. getUsuarios)

  router.get('/listar/:id',[
    validarCampos
  ],  httpUsuarios.getUsuariosID)
  
  router.get('/activos',[
    validarCampos
  ],  httpUsuarios.getUsuariosActivo)
  
  router.get('/inactivos',[
    validarCampos
  ],  httpUsuarios.getUsuariosInactivo)

router.post('/', [
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('direccion', 'La sdireccion no puede estar vacia').notEmpty(),
    check('documento', 'El documento no puede estar vacio').notEmpty(),
    check('documento').custom(helperUsuario.documentoUnico),
    check('correo', 'El correo no puede estar vacio').notEmpty(),
    check('password', 'La contraseña no puede estar vacia').notEmpty(),
    check('telefono', 'El telefono no puede estar vacio').notEmpty(),
    check('telefono', "El telefono solo debe llevar números").isNumeric(),
    check('rol', 'El Rol no puede estar vacio').notEmpty(),
    check('municipio', 'El Municipio no puede estar vacio').notEmpty(),
    validarCampos
], httpUsuarios.postUsuarios)

router.put('/:id', [
    check('id', 'Se necesita un mongoid valido').isMongoId(),
    check('id').custom(helperUsuario.validarExistaUsuarioId),
    validarCampos
], httpUsuarios.putUsuarios)

router.put('/activar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperUsuario.validarExistaUsuarioId),
    validarCampos 
  ], httpUsuarios.putUsuariosActivar)
  
  router.put('/desactivar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperUsuario.validarExistaUsuarioId),
    validarCampos 
  ], httpUsuarios.putUsuariosDesactivar)
  router.post('/login',[
   check('documento', 'El documento no puede estar vacio').notEmpty(),
   check('documento').custom(helperUsuario.noExisteDocumento),
    validarCampos
  ],httpUsuarios.login)

export default router