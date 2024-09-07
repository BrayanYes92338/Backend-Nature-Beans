import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpInsumos from "../controllers/insumos.js"
import helperInsumo from "../helpers/insumos.js"

const router = Router()

router.get('/listar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
  ], httpInsumos.getInsumos)

   insumo.get('/listarid/:id', [
        validarCampos
    ], httpInsumo.getInsumoID);
    
    insumo.post('/agregar', [
        check('idReponsable', 'se necesita un mongoID que sea valido para id Reponsable').isMongoId(),
        check('IdProveedor', 'se necesita un mongoID que sea valido para Id Proveedor').isMongoId(),
        check('idReponsable').custom(helpersInsumo.validarEmpleadoId),
        check('IdProveedor').custom(helpersInsumo.validarProveedorId),
        check('idReponsable', 'el id Reponsable no puede estar vacio').notEmpty(),
        check('IdProveedor', 'la Id Proveedor no puede estar vacio').notEmpty(),
        check('nombre', 'el nombre no puede estar vacio').notEmpty(),
        check('relacionNPK','la relacionNPK  no puede estar vacio').notEmpty(),
        check('cantidad', 'La cantidad  no puede estar vacia').notEmpty(),
        check('precio', 'La precio no puede estar vacia').notEmpty(),
        check('observaciones', 'La observaciones no puede estar vacia').notEmpty(),
        validarCampos
    ], httpInsumo.postInsumo) 

router.put('/editar/:id', [
  validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperInsumo.validarInsumoID),
    validarCampos
], httpInsumos.putInsumos)



  export default router