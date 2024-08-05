import {Router} from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpParcela from '../controllers/parcela.js'
import helpersParcela from '../helpers/parcela.js'

const parcela = Router()

parcela.get('/listar',[
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
    validarCampos
  ],httpParcela.getParcela)

parcela.post('/agregar', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('idFinca', 'El id finca no puede estar vacio').notEmpty(),
  check('asistenteTecnico', 'AsistenteTecnico no puede estar vacio').notEmpty(),
  check('ubicacion', 'Ubicacion no puede estar vacio').notEmpty(),
  check('numero', 'Numero no puede estar vacio').notEmpty(),
  check('numero').custom(helpersParcela.validarNumeroUnico),
  check('cultivoAnterior', 'CultivoAnterior no puede estar vacio').notEmpty(),
  check('cultivoActual', '  CultivoActual no puede estar vacio').notEmpty(),
  check('detalle', 'Detalle no puede estar vacio').notEmpty(),
  check('area', 'El area no puede estar vacio').notEmpty(),
  validarCampos
], httpParcela.postParcela)

parcela.put('/editar/:id',[
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
  check('id').custom(helpersParcela.validarParcelaId),
  validarCampos
],httpParcela.putParcela)

parcela.put('/activar/:id',[
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
  validarCampos
], httpParcela.putParcelaActivas)

parcela.put('/desactivar/:id', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
  validarCampos
], httpParcela.putParcelaInactivas)


export default parcela