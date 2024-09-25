import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import httpSiembra from '../controllers/siembra.js'
import helperSiembra from '../helpers/siembra.js'

const router = Router()

router.get("/listar",[],httpSiembra.getSiembra)
router.get("/listarID/:id",[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helperSiembra.validarSiembraID),
    validarCampos,
],httpSiembra.getSiembraID)

router.get("/listar/fechas",[],httpSiembra.getSiembraFechas)

router.get("/listar/empleado/:id",[],httpSiembra.getSiembraEmpleado)

router.get("/listar/cultAnterior/:cultivoAnterior",[],httpSiembra.getSiembraCultAnterior)

router.post("/agregar",[
    check("idCultivo", "El idcultivo no puede estar vacio").notEmpty(),
    check("idEmpleados", "El idEmpleados no puede estar vacio").notEmpty(),
    check("idSemilla", "El idSemilla no puede estar vacio").notEmpty(),
    check("cultivoAnterior", "El cultivoAnterior no puede estar vacio").notEmpty(),
    check("transplante", "El transplante no puede estar vacio").notEmpty(),
    validarCampos
],httpSiembra.postSiembra)

router.put("/editar/:id",[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helperSiembra.validarSiembraID),
    validarCampos,
],httpSiembra.putSiembra)

export default router