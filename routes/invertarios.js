import { Router } from 'express'
import { check } from 'express-validator'
import httpinventario from '../controllers/inventarios.js'
import helperInventario from '../helpers/inventario.js'
import { validarCampos } from '../middleware/validar-campos.js'

const router = Router()

router.get('/listar',[],httpinventario.getInventario)

router.get('/listarID/:id',[],httpinventario.getInventarioID)

router.get('/listarCant/:cantidad',[
],httpinventario.getInventarioCant)

router.post('/agregar',[
    check('idInsumo', 'idInsumo no debe estar vacio').notEmpty(),
    check('idSemilla','idSemilla no debe estar vacio').notEmpty(),
    check('idMaquinaria','idSemilla no debe estar vacio').notEmpty(),
    check('tipo','tipo no debe estar vacio').notEmpty(),
    check('observaciones','observaciones no debe estar vacio').notEmpty(),
    check('cantidad','cantidad no debe estar vacio').notEmpty(),
    check('unidad','unidad no debe estar vacio').notEmpty(),
    validarCampos
],httpinventario.postInventario)

router.put('/editar/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperInventario.validarInventarioID),
    validarCampos
],httpinventario.putInventario)

export default router