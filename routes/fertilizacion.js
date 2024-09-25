import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import httpFertilizacion from '../controllers/fertilizacion.js'
import helperFertilizacion from '../helpers/fertilizacion.js'


const router = Router()

router.get('/listar',[],httpFertilizacion.getFertilizacion)

router.get('/listarID/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFertilizacion.validarFertilizacionID),
    validarCampos
],httpFertilizacion.getFertilizacionID)

router.get('/listar/empleado/:id',[],httpFertilizacion.getFertilizacionEmpleado)

router.get('/listar/fechas',[],httpFertilizacion.getFertilizacionFechas)


 
router.post('/agregar',[
    check('idCultivo', 'idCultivo no puede estar vacio').notEmpty(),
    check('idEmpleado', 'idEmpleado no puede estar vacio').notEmpty(),
    check('estadoFenologico', 'estadoFenologico no puede estar vacio').notEmpty(),
    check('tipo', 'tipo no puede estar vacio').notEmpty(),
    check('nombreFertilizante', 'nombreFertilizante no puede estar vacio').notEmpty(),
    check('cantidad', 'cantidad no puede estar vacio').notEmpty(),
    validarCampos
],httpFertilizacion.postFertilizacion)

router.put('/editar/:id',[
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperFertilizacion.validarFertilizacionID),
    validarCampos
],httpFertilizacion.putFertilizacion)

export default router