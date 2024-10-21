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

router.get('/listar/fechas',[],httpFactura.getFacturaFechas)

router.get("/listar/total",[],httpFactura.getFacturaValor)



router.post('/agregar',[
    check('idComprador', 'idComprador no puede estar vacio').notEmpty(),
    check('detalle', 'detalle no puede estar vacio').notEmpty(),
    validarCampos
],httpFactura.postFactura)

router.put('/editar/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFactura.validarFacturaID),
    validarCampos
],httpFactura.putFactura)

export default router