import {Router} from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpProveedor from '../controllers/proveedor.js'
import helperProveedor from '../helpers/proveedor.js'

const router = Router()

router.get('/listar',[
    validarCampos
], httpProveedor.getProveedor)

router.get('/listarid/:id', [
    validarCampos
], httpProveedor.getProveedorID);

router.get('/activos', [
    validarCampos
], httpProveedor.getProveedorActivo)

router.get('/inactivos', [
    validarCampos
], httpProveedor.getProveedorInactivo)

router.post('/agregar', [
    check('nombre', 'El espacio del nombre no puede estar vacio').notEmpty(),
    check('direccion', 'El espacio de la Dirrecion no puede estar vacio').notEmpty(),
    check('telefono', 'El espacio del telefono no puede estar vacio').notEmpty(),
    check('telefono', 'Se necesita que el telefono sea numerico').isNumeric(),
    check('correo', 'Se necesita agregar un correo').notEmpty(),
    check('correo').custom(helperProveedor.CorreoUnicoProveedor),
    validarCampos
], httpProveedor.postProveedor)

router.put('/editar/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedor)

router.put('/activar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedorActivo)
router.put('/desactivar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedorInactivo)

export default router