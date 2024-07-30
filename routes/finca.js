import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpFinca from '../controllers/finca.js'
import helperFinca from '../helpers/finca.js'
const router = Router()

router.get('/listar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
], httpFinca.getFinca)
router.post('/agregar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('idUsuario', 'El id del Usuario no puede estar vacio').notEmpty(),
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('ruc', 'El RUC no puede estar vacio').notEmpty(),
    check('ciudad', 'La ciudad no puede estar vacio').notEmpty(),
    check('departamento', 'El departamento no puede estar vacio').notEmpty(),
    check('direccion', 'La direccion no puede estar vacio').notEmpty(),
    check('ubicacion', 'La ubicacion no puede estar vacio').notEmpty(),
    check('area', 'El area no puede estar vacio').notEmpty(),
    validarCampos
], httpFinca.postFinca)
router.put('/editar/:id',[
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFinca.validarFincaID),
    validarCampos
], httpFinca.putFinca)
router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFinca.validarFincaID),
    validarCampos
], httpFinca.putFincaActivas)
router.put('/desactivar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFinca.validarFincaID),
    validarCampos
], httpFinca.putFincasInactivas)



export default router