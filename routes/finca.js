import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpFinca from '../controllers/finca.js'
import helperFinca from '../helpers/finca.js'
const router = Router()

router.get('/listar', [
    validarJWT,
    validarCampos
], httpFinca.getFinca)
router.get('/listarFincaActivas', [
    validarJWT,
    validarCampos
], httpFinca.getFincaActiva)
router.get('/listarFincaInactivas', [
    validarJWT,
    validarCampos
], httpFinca.getFincaInactiva)
router.post('/agregar', [
    validarJWT,
    check('idUsuario', 'El id del Usuario no puede estar vacio').notEmpty(),
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('ruc', 'El RUC no puede estar vacio').notEmpty(),
    check('ciudad', 'La ciudad no puede estar vacio').notEmpty(),
    check('departamento', 'El departamento no puede estar vacio').notEmpty(),
    check('direccion', 'La direccion no puede estar vacio').notEmpty(),
    check('ubicacion', 'La ubicacion no puede estar vacio').notEmpty(),
    check('documentos', 'Los documentos no puede estar vacio').notEmpty(),
    check('limites', 'Los limites no puede estar vacio').notEmpty(),
    check('area', 'El area no puede estar vacio').notEmpty(),
    validarCampos
], httpFinca.postFinca)

router.put('/editar/:id',[
    validarJWT,
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFinca.validarFincaID),
    validarCampos
], httpFinca.putFinca)

router.put('/activar/:id',[
    validarJWT,
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFinca.validarFincaID),
    validarCampos
], httpFinca.putFincaActivas)

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFinca.validarFincaID),
    validarCampos
], httpFinca.putFincasInactivas)



export default router