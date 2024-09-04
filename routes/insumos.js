import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpInsumo from '../controllers/insumos.js'
import helpersInsumo from '../helpers/insumos.js'

// import helperNomina from '../helpers/nomina.js'

const insumo = Router()

insumo.get('/listar',[
    validarCampos], httpInsumo.getInsumo)

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
        check('fecha', 'la fecha no puede estar vacio').notEmpty(),
        check('relacionNPK','la relacionNPK  no puede estar vacio').notEmpty(),
        check('cantidad', 'La cantidad  no puede estar vacia').notEmpty(),
        check('precio', 'La precio no puede estar vacia').notEmpty(),
        check('observaciones', 'La observaciones no puede estar vacia').notEmpty(),
        validarCampos
    ], httpInsumo.postInsumo) 

    insumo.put('/editar/:id',[
        check('idReponsable', 'se necesita un mongoID que sea valido para id Reponsable').isMongoId(),
        check('IdProveedor', 'se necesita un mongoID que sea valido para Id Proveedor').isMongoId(),
        check('idReponsable').custom(helpersInsumo.validarEmpleadoId),
        check('IdProveedor').custom(helpersInsumo.validarProveedorId),
        check('idReponsable', 'el id Reponsable no puede estar vacio').notEmpty(),
        check('IdProveedor', 'la Id Proveedor no puede estar vacio').notEmpty(),
        check('nombre', 'el nombre no puede estar vacio').notEmpty(),
        check('fecha', 'la fecha no puede estar vacio').notEmpty(),
        check('relacionNPK','la relacionNPK  no puede estar vacio').notEmpty(),
        check('cantidad', 'La cantidad  no puede estar vacia').notEmpty(),
        check('unidad', 'La unidad no puede estar vacia').notEmpty(),
        check('observaciones', 'La observaciones no puede estar vacia').notEmpty(),
        check('total', 'el total no puede estar vacia').notEmpty(),
        validarCampos
    ], httpInsumo.putInsumo)
    

    
    export default insumo