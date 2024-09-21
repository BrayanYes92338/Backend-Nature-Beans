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
    check('idFinca', 'El id del Finca no puede estar vacio').notEmpty(),
    check('idFinca', 'Se debe agregar un id de Finca que sea valido').isMongoId(),
    check('nombre', 'Se debe agregar un nombre').notEmpty(),
    check('relacionNPK', 'Se debe agregar la cantidad NPK').notEmpty(),
    check('registro_ICA', 'Se debe agregar el registro_ICA').notEmpty(),
    check('registro_Invima', 'Se debe agregar el registro_Invima').notEmpty(),
    check('cantidad', 'Se debe agregar la cantidad de Insumos').notEmpty(),
    check('precio', 'Se debe agregar el precio').notEmpty(),
    check('observaciones', 'Se debe agregar las observaciones').notEmpty(),
    check('unidad', 'Se debe agregar unidad').notEmpty(),
    validarCampos
], httpInsumos.postInsumos) 

router.put('/editar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperInsumo.validarInsumoID),
    validarCampos
], httpInsumos.putInsumos)


  export default router