import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpComprador from '../controllers/comprador.js'
import helpersComprador from '../helpers/comprador.js'


const comprador = Router()

comprador.get('/listar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
], httpComprador.getComprador)

comprador.get('/listarid/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helpersComprador.validarCompradorId),
    validarCampos
], httpComprador.getCompradorID);


comprador.get('/activos', [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos
],  httpComprador.getCompradorActivo )

comprador.get('/inactivos', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
  ],httpComprador.getCompradorInactivo)

comprador.post('/agregar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('idProduccion', 'el ID de Comprador no puede estar vacio').notEmpty(),
    check('nombre', 'el nombre no puede estar vacio').notEmpty(),
    check('especie', 'la especie no puede estar vacia').notEmpty(),
    check('documento', 'El documento no puede estar vacio').notEmpty(),
    check('telefono', 'El telefono no puede estar vacio').notEmpty(),
    check('cantidad', 'La cantidad no puede estar vacia').notEmpty(),
    check('nguiaTransporte', 'El  nguiaTransporte no puede estar vacio').notEmpty(),
    check('valor', 'El valor no puede estar vacio').notEmpty(),
    check('documento').custom(helpersComprador.validarDocumento),
    check('nguiaTransporte').custom(helpersComprador.validarCodigoUnico),

    validarCampos

], httpComprador.postComprador)

comprador.put('/editar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helpersComprador.validarCompradorId),
    validarCampos
], httpComprador.putcomprador)

comprador.put('/activar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helpersComprador.validarCompradorId),
    validarCampos
], httpComprador.putCompradorActiva)

comprador.put('/desactivar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helpersComprador.validarCompradorId),
    validarCampos
], httpComprador.putCompradorInactiva)

export default comprador

