import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpClima from '../controllers/clima.js'
import helperClima from '../helpers/clima.js'


const router = Router()

router.get('/listar',[
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos], httpClima.getClima)
    

    router.get('/listarid/:id', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        validarCampos
    ], httpClima.getClimaID);
    
    router.get('/activar', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        validarCampos
    ], httpClima.getClimaActivo)
    
    router.get('/desactivar', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        validarCampos
    ], httpClima.getClimaInactivo)

router.post('/agregar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('idFinca', 'el ID de la finca no puede estar vacio').notEmpty(),
    check('idEmpleado', 'El ID del empleado no puede estar vacio').notEmpty(),
    check('tipoClima','El tipo de clima  no puede estar vacio').notEmpty(),
    check('horaInicio', 'La hora de inicio no puede estar vacia').notEmpty(),
    check('horaFinal', 'La hora de fin no puede estar vacia').notEmpty(),
    check('tempMin', 'La temperatura minima  no puede estar vacia').notEmpty(),
    check('tempMax', 'La temperatura maxima  no puede estar vacia').notEmpty(),
    validarCampos

], httpClima.postClima)    

router.put('/editar/:id',[
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperClima.validarClimaID),
    validarCampos
], httpClima.putClima)

router.put('/activar/:id', [
    check('id', 'Se necesita un mongoID que sea valido' ).isMongoId(),
    check('id').custom(helperClima.validarClimaID),
    validarCampos
], httpClima.putClimaActivos)

router.put('/desactivar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido' ).isMongoId(),
    check('id').custom(helperClima.validarClimaID),
    validarCampos
], httpClima.putClimaInactivos)

export default router