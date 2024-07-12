import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpProduccion from "../controllers/produccion.js";
import helperProduccion from "../helpers/produccion.js";

const router = Router()

router.get('/listar',[validarCampos],httpProduccion.getProduccion)

router.get('/listarid/:id',[validarCampos],httpProduccion.getProduccionID)

router.post('/agregar',[
    check('idCultivo', 'El idCultivo no puede estar vacio').notEmpty(),
    check('numLote', 'El numLote no puede estar vacio').notEmpty(),
    check('producto', 'El procduto no puede estar vacio').notEmpty(),
    check('cantidad', 'El cantidad no puede estar vacio').notEmpty(),
    check('cantidadTrabajadores', 'El cantidadTrabajadores no puede estar vacio').notEmpty(),
    check('observaciones', 'El observaciones no puede estar vacio').notEmpty(),
    validarCampos],httpProduccion.postProduccion)

router.put('/editar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperProduccion.validarExistaProduccionId),
    validarCampos],httpProduccion.putProduccion)

export default router

