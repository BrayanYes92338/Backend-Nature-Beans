import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpControlPlaga from '../controllers/controlPlagas.js'
import helperControlPlaga from '../helpers/controlPlagas.js'


const router = Router()

router.get('/listar',[
    validarCampos], httpControlPlaga.getControlPlaga)
    
router.get('/listar/tipo/:tipo',[
    validarCampos], httpControlPlaga.getControlPlagaTipo)

router.get('/listar/fechas',[
    validarCampos], httpControlPlaga.getControlPlagaFechas)

router.get('/listar/operario/:id',[
    validarCampos], httpControlPlaga.getControlPlagaOperario)           

router.post('/agregar', [
    check('idCultivo', 'El ID del  Cultivo no puede estar vacio').notEmpty(),
    check('idEmpleado', 'El ID del empleado no puede estar vacio').notEmpty(),
    check('idOperario','El ID del operario no puede estar vacio').notEmpty(),
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('tipo', 'El tipo de control de plaga no puede estar vacio').notEmpty(),
    check('ingredienteActivo', 'El ingrediente no puede estar vacio').notEmpty(),
    check('dosis', 'La dosis del control de plaga  no puede estar vacia').notEmpty(),
    check('observaciones', 'Las observaciones no pueden estar vacias').notEmpty(),
    validarCampos

], httpControlPlaga.postControlPlaga)    

router.put('/editar/:id',[
    check('id', 'se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperControlPlaga.validarControlPlagaID),
    validarCampos
], httpControlPlaga.putControlPlaga)


export default router