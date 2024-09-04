import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpProceso from '../controllers/proceso.js'
import helperProceso from '../helpers/proceso.js'

const router = Router()

router.get('/listar',[
    validarCampos], httpProceso.getProceso)

    router.get('/listarid/:id', [
        validarCampos
    ], httpProceso.getProcesoID);
    
    router.get('/listar/empleado/:id', [
        validarCampos
    ], httpProceso.getProcesoEmpleado);

    router.get('/listar/fechas', [
        validarCampos
    ], httpProceso.getProcesosFechas);

    router.get('/listar/tipo/:tipo', [
        validarCampos
    ], httpProceso.getProcesoTipo);

router.post('/agregar', [
    check('idCultivo', 'el ID de la cultivo no puede estar vacio').notEmpty(),
    check('idEmpleado', 'El ID del empleado no puede estar vacio').notEmpty(),
    check('tipo','El tipo de proceso  no puede estar vacio').notEmpty(),
    check('descripcion', 'La descripcion  no puede estar vacia').notEmpty(),
    check('fechaFinal', 'La fecha de final no puede estar vacia').notEmpty(),
    validarCampos

], httpProceso.postProceso)    

router.put('/editar/:id',[
    check('id', 'se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProceso.validarExistaProcesoId),
    validarCampos
], httpProceso.putProceso)


export default router