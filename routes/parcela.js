import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";
import httpParcela from '../controllers/parcela.js';
import helperParcela from '../helpers/parcela.js';

const router = Router()

router.get('/listar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
], httpParcela.getParcela)

router.post('/agregar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('idFinca', 'El id de la finca es obligatorio').notEmpty(),
    check('idFinca', 'El id de la finca no es valido').isMongoId(),
    check('asistenteTecnico', 'El asistente tecnico es obligatorio').notEmpty(),
    check('asistenteTecnico', 'El asistente tecnico no es valido').isMongoId(),
    check('ubicacion', 'La ubicacion es obligatoria').notEmpty(),
    check('numero', 'El numero es obligatorio').notEmpty(),
    check('numero', 'El numero no es valido').isNumeric(),
    check('numero').custom(helperParcela.validarNumeroParcela),
    check('cultivoAnterior', 'El cultivo anterior es obligatorio').notEmpty(),
    check('cultivoActual', 'El cultivo actual es obligatorio').notEmpty(),
    check('detalle', 'El detalle es obligatorio').notEmpty(),
    check('area', 'El area es obligatoria').notEmpty(),
    validarCampos
], httpParcela.postParcela)

router.put('/editar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'El id de la parcela es obligatorio').notEmpty(),
    check('id').custom(helperParcela.validarExistaParcelaID),
    validarCampos
], httpParcela.putParcela)

router.put('/activar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'El id de la parcela es obligatorio').notEmpty(),
    check('id').custom(helperParcela.validarExistaParcelaID),
    validarCampos
], httpParcela.putParcelaActivar)

router.put('/desactivar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'El id de la parcela es obligatorio').notEmpty(),
    check('id').custom(helperParcela.validarExistaParcelaID),
    validarCampos
], httpParcela.putParcelaDesactivar)

export default router