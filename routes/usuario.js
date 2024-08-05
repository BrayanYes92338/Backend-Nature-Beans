import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpUsuarios from '../controllers/usuario.js'
import helperUsuario from '../helpers/usuario.js'

const router = Router()

router.get('/listar', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos
], httpUsuarios.getUsuarios)

router.get('/listarid/:id', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos
], httpUsuarios.getUsuariosID)

router.get('/listarRol', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos
], httpUsuarios.getUsuarioAdmin)

router.get('/activos', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos
], httpUsuarios.getUsuariosActivo)

router.get('/inactivos', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos
], httpUsuarios.getUsuariosInactivo)

router.post('/agregar', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('nombre', 'El nombre no puede estar vacio').notEmpty(),
  check('direccion', 'La direccion no puede estar vacia').notEmpty(),
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

router.put('/editar/:id', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', 'Se necesita un mongoid valido').isMongoId(),
  check('id').custom(helperUsuario.validarExistaUsuarioId),
  validarCampos
], httpUsuarios.putUsuarios)

router.put('/activar/:id', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helperUsuario.validarExistaUsuarioId),
  validarCampos
], httpUsuarios.putUsuariosActivar)

router.put('/desactivar/:id', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helperUsuario.validarExistaUsuarioId),
  validarCampos
], httpUsuarios.putUsuariosDesactivar)
router.post('/login', [
  check('documento', 'El documento no puede estar vacio').notEmpty(),
  check('documento').custom(helperUsuario.noExisteDocumento),
  validarCampos
], httpUsuarios.login)

export default router