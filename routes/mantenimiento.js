import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validar-campos.js';
import { validarJWT } from '../middleware/validar-jwt.js';
import { validarRol } from "../middleware/validar-rol.js";
import httpMantenimiento from '../controllers/mantenimiento.js';
import HelperMantenimiento from "../helpers/mantenimiento.js"

const mantenimiento = Router();

mantenimiento.get('/listar', [
    validarJWT,
  validarRol(["ADMIN", "GESTOR"]),

    validarCampos
], httpMantenimiento.getMantenimiento);

mantenimiento.get('/listarid/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea válido').isMongoId(),
    validarCampos
], httpMantenimiento.getMantenimientoID);
mantenimiento.get('/activos', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
], httpMantenimiento.getMantenimientoActivo)

mantenimiento.get('/inactivos', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    validarCampos
], httpMantenimiento.getMantenimientoInactivo)
mantenimiento.post('/agregar', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('idMaquinaria', 'El ID de Maquinaria es obligatorio y debe ser un MongoID válido').isMongoId(),
    check('responsable', 'El ID del responsable es obligatorio y debe ser un MongoID válido').isMongoId(),
    check('observaciones', 'Las observaciones son obligatorias').notEmpty(),
    validarCampos
], httpMantenimiento.postMantenimiento);

mantenimiento.put('/editar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check("id").custom(HelperMantenimiento.validarMantenimientoID),
    validarCampos
], httpMantenimiento.putMantenimiento);

mantenimiento.put('/activar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check("id").custom(HelperMantenimiento.validarMantenimientoID),
    validarCampos
], httpMantenimiento.putMantenimientoActivo)
mantenimiento.put('/desactivar/:id', [
    validarJWT,
    validarRol(["ADMIN", "GESTOR"]),
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check("id").custom(HelperMantenimiento.validarMantenimientoID),
    validarCampos
], httpMantenimiento.putMantenimientoInactivo)
export default mantenimiento;
