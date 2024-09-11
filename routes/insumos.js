import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpInsumos from "../controllers/insumos.js"
import helperInsumo from "../helpers/insumos.js"

const router = Router()

router.get('/listar', [
    validarCampos 
  ], httpInsumos.getInsumos)

router.post('/agregar',[
    check('IdProveedor', 'El id del Proveedor no puede estar vacio').notEmpty(),
    check('IdProveedor', 'Se debe agregar un id de Proveedor que sea valido').isMongoId(),
    check('idReponsable', 'El id del Trabajador no puede estar vacio').notEmpty(),
    check('idReponsable', 'Se debe agregar un id del empleado que sea valido').isMongoId(),
    check('nombre', 'Se debe agregar un nombre').notEmpty(),
    check('relacionNPK', 'Se debe agregar la cantidad NPK').notEmpty(),
    check('cantidad', 'Se debe agregar la cantidad de Insumos').notEmpty(),
    check('unidad', 'Se debe agregar unidad').notEmpty(),
    check('observaciones', 'Se debe agregar las observaciones').notEmpty(),
    validarCampos
], httpInsumos.postInsumos)

router.put('/editar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperInsumo.validarInsumoID),
    validarCampos
], httpInsumos.putInsumos)


  export default router