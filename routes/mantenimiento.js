import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validar-campos.js';
import { validarJWT } from '../middleware/validar-jwt.js';
import httpMantenimiento from '../controllers/mantenimiento.js';

const mantenimiento = Router();

mantenimiento.get('/listar', [
    validarCampos
], httpMantenimiento.getMantenimiento);

mantenimiento.get('/listarid/:id', [
    check('id', 'Se necesita un mongoID que sea válido').isMongoId(),
    validarCampos
], httpMantenimiento.getMantenimientoID);

mantenimiento.get('/listar/fechas', [
    validarCampos
], httpMantenimiento.getmantenimientoFechas);

mantenimiento.get('/listar/responsable/:id', [
    validarCampos
], httpMantenimiento.getMantenimientoResponsable);

mantenimiento.get('/listar/maquina/:id', [
    validarCampos
], httpMantenimiento.getMantenimientoMaquina);

mantenimiento.post('/agregar', [
    check('idMaquinaria', 'El ID de Maquinaria es obligatorio y debe ser un MongoID válido').isMongoId(),
    check('responsable', 'El ID del responsable es obligatorio y debe ser un MongoID válido').isMongoId(),
    check('observaciones', 'Las observaciones son obligatorias').notEmpty(),
    validarCampos
], httpMantenimiento.postMantenimiento);

mantenimiento.put('/editar/:id', [
    check('id', 'Se necesita un mongoID que sea válido').isMongoId(),
    check('idMaquinaria', 'El ID de Maquinaria es obligatorio y debe ser un MongoID válido').optional().isMongoId(),
    check('responsable', 'El ID del responsable es obligatorio y debe ser un MongoID válido').optional().isMongoId(),
    check('observaciones', 'Las observaciones son obligatorias').optional().notEmpty(),
    validarCampos
], httpMantenimiento.putMantenimiento);

export default mantenimiento;
