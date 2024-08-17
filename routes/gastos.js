import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import httpGastos from '../controllers/gastos.js'
import helperGastos from '../helpers/gastos.js'

const router = Router()

router.get("/listar",[],httpGastos.getGastos)
router.get("/listarID/:id",[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helperGastos.validarGastosID),
    validarCampos,
],httpGastos.getGastosID)

router.post("/agregar",[
    check("idInsumo", "El idInsumo no puede estar vacio").notEmpty(),
    check("idSemilla", "El idSemilla no puede estar vacio").notEmpty(),
    check("idMantenimiento", "El idMantenimiento no puede estar vacio").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("numerofactura", "El numerofactura no puede estar vacio").notEmpty(),
    check("descripcion", "El descripcion no puede estar vacio").notEmpty(),
    validarCampos
],httpGastos.postGastos) 

router.put("/editar/:id",[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helperGastos.validarGastosID),
    validarCampos,
],httpGastos.putGastos)

export default router;