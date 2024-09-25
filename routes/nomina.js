import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpNomina from '../controllers/nomina.js'
import helperNomina from '../helpers/nomina.js'

const router = Router()

router.get('/listar',[
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos], httpNomina.getNomina)

    router.get('/listarid/:id', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        validarCampos
    ], httpNomina.getNominaID);
    
    router.get('/activos', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        validarCampos
    ], httpNomina.getNominaActiva)
    
    router.get('/inactivos', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        validarCampos
    ], httpNomina.getNominaInactiva)

    router.get('/valorTotal', [
        validarCampos
    ], httpNomina.getNominaValor)

    router.get('/listar/empleado/:id', [
        validarCampos
    ], httpNomina.getNominaEmpleado)

    router.get('/listar/fechas', [
        validarCampos
    ], httpNomina.getNominaFechas)

    router.post('/agregar', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        check('idEmpleado', 'el ID del empleado no puede estar vacio').notEmpty(),
        check('tipo','El tipo   no puede estar vacio').notEmpty(),
        check('valor', 'el valor no puede estar vacio').notEmpty(),
        validarCampos
    
    ], httpNomina.postNomina) 

    router.put('/editar/:id',[
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        check('id', 'se necesita un mongoID que sea valido').isMongoId(),
        check('id').custom(helperNomina.validarNominaID),
        validarCampos
    ], httpNomina.putNomina)
    
    router.put('/activar/:id', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        check('id', 'Se necesita un mongoID que sea valido' ).isMongoId(),
        check('id').custom(helperNomina.validarNominaID),
        validarCampos
    ], httpNomina.putNominaActiva)
    
    router.put('/desactivar/:id', [
        validarJWT,
        validarRol(["ADMIN", "GESTOR"]),
        check('id', 'Se necesita un mongoID que sea valido' ).isMongoId(),
        check('id').custom(helperNomina.validarNominaID),
        validarCampos
    ], httpNomina.putNominaInactiva)
    
    export default router