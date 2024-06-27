import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpParcela from '../controllers/parcela.js'
import helperParcela from '../helpers/parcela.js'

const router = Router()

router.get('/listar', [
    validarCampos
], httpParcela.getParcela)
router.get('/listarID/:id', [
    validarCampos
], httpParcela.getParcelaID)
router.post('/agregar', [
check('idFinca', 'El id de la finca no puede estar vacio').notEmpty(),
check('asistenteTecnico', 'El id del trabajador no puede estar vacio').notEmpty(),
check('ubicacion', 'La Ubicacion no puede estar vacia').notEmpty(),
check('numero', 'El numero no puede estar vacio').notEmpty(),
check('cultivoAnterior', 'El registro de Cultivo Anterior no puede estar vacio').notEmpty(),
check('cultivoActual', 'El Cultivo Actual no puede estar vacio').notEmpty(),
check('detalle', 'El detalle no puede estar vacio').notEmpty(),
check('area', 'El  area no puede estar vacio').notEmpty(),
validarCampos
], httpParcela.postParcela)
router.put('/editar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperParcela.ValidarParcelaID),
    validarCampos
], httpParcela.putParcela)
router.put('/activar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperParcela.ValidarParcelaID),
    validarCampos
], httpParcela.putParcelaActiva)
router.put('/desactivar/:id', [
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperParcela.ValidarParcelaID),
    validarCampos
], httpParcela.putParcelaInactiva)




export default router