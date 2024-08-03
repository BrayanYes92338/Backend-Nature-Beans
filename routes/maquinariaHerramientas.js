import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
// import { validarJWT } from '../middleware/validar-jwt.js'
// import { validarRol } from "../middleware/validar-rol.js";
import httpmaquinariaHerramientas from '../controllers/maquinariaHerramientas.js';
import helpermaquinariaHerramientas from '../helpers/maquinariaHerramientas.js';

const router = Router()

router.get('/listar',[],httpmaquinariaHerramientas.getMaquinariaHerramientas)

router.get('/listarID/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helpermaquinariaHerramientas.validarmaquinariaHerramientasID),
    validarCampos
],httpmaquinariaHerramientas.getMaquinariaHerramientasID)

router.post('/agregar',[
    check('idProveedor', 'El id del Proveedor no puede estar vacio').notEmpty(),
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('tipo', 'El tipo no pude estar vacio').notEmpty(),
    check('observaciones', 'La obeservacion no puede estar vacia').notEmpty(),
    check('cantidad', 'La cantidad no puede estar vacia').notEmpty(),
    check('precio', 'El precio no puede estar vacio').notEmpty(),
    validarCampos
],httpmaquinariaHerramientas.postMaquinariaHerramientas)

router.put('/editar/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helpermaquinariaHerramientas.validarmaquinariaHerramientasID),
    validarCampos
],httpmaquinariaHerramientas.putMaquinariaHerramientas)

export default router