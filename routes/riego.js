import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpRiego from '../controllers/riego.js'
import helperRiego from '../helpers/riego.js'


const router = Router()

router.get('/listar',[
    validarCampos], httpRiego.getRiego)

    router.get('/listar/:id', [
        validarCampos
    ], httpRiego.getRiegoID);
    
router.post('/agregar', [
    check('idCultivo', 'el ID del cultivo no puede estar vacio').notEmpty(),
    check('idEmpleado', 'El ID del empleado no puede estar vacio').notEmpty(),
    check('diasTransplante', 'El dia de transplante no puede estar vacio').notEmpty(),
    check('estadoFenológico', 'El estado Fenológico no puede estar vacio').notEmpty(),
    check('horaInicio', 'La hora de inicio  no puede estar vacio').notEmpty(),
    check('horaFin', 'La hora  final no puede estar vacio').notEmpty(),
    check('dosis', 'La dosis  no puede estar vacia').notEmpty(),
    check('cantidadAgua', 'La cantidad de Agua  no puede estar vacia').notEmpty(),
    validarCampos

], httpRiego.postRiego)    

router.put('/editar/:id',[
    check('id', 'se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperRiego.validarRiegoID),
    validarCampos
], httpRiego.putRiego)



export default router