import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import httpFactura from '../controllers/factura.js'
import helperFactura from '../helpers/factura.js'

const router = Router()


router.get('/listar',[],httpFactura.getFactura)
router.get('/listarID/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFactura.validarFacturaID),
    validarCampos
],httpFactura.getFacturaID)


router.post('/agregar',[
    check('idInventario', 'idInventario no puede estar vacio').notEmpty(),
    check('idComprador', 'idComprador no puede estar vacio').notEmpty(),
    check('loteComercialnum', 'loteComercialnum no puede estar vacio').notEmpty(),
    check('precio', 'precio no puede estar vacio').notEmpty(),
    check('cantidad', 'cantidad no puede estar vacio').notEmpty(),
    check('iva', 'iva no puede estar vacio').notEmpty(),
    check('subtotal', 'subtotal no puede estar vacio').notEmpty(),
    validarCampos
],httpFactura.postFactura)

router.put('/editar/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFactura.validarFacturaID),
    validarCampos
],httpFactura.putFactura)

export default router