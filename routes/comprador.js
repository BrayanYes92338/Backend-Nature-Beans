import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpComprador from '../controllers/comprador.js'
import helpersComprador from '../helpers/comprador.js'

// import helperNomina from '../helpers/nomina.js'

const comprador = Router()

comprador.get('/listar',[
    validarCampos], httpComprador.getComprador)

    comprador.get('/listarid/:id', [
        check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
        check('id').custom(helpersComprador.validarCompradorId),
        validarCampos
    ], httpComprador.getCompradorID);
    
    comprador.get('/listar/fechas',[
        validarCampos], httpComprador.getCompradorFechas)

    comprador.post('/agregar', [
        check('idProduccion', 'el ID de Comprador no puede estar vacio').notEmpty(),
        check('nombre', 'el nombre no puede estar vacio').notEmpty(),
        check('telefono', 'El telefono no puede estar vacio').notEmpty(),
        check('nguiaTransporte','El  nguiaTransporte no puede estar vacio').notEmpty(),
        check('idProduccion').custom(helpersComprador.validarProduccionId),
        check('nguiaTransporte').custom(helpersComprador.validarCodigoUnico),

        validarCampos
   
    ], httpComprador.postComprador) 

    comprador.put('/editar/:id',[
        check('idProduccion', 'el ID de Comprador no puede estar vacio').notEmpty(),
        check('nombre', 'el nombre no puede estar vacio').notEmpty(),
        check('telefono', 'El telefono no puede estar vacio').notEmpty(),
        check('nguiaTransporte','El  nguiaTransporte no puede estar vacio').notEmpty(),
        check('idProduccion').custom(helpersComprador.validarProduccionId),
        check("nguiaTransporte").custom((nguiaTransporte, { req }) => helpersComprador.validarCodigoUnicoEditar(nguiaTransporte, { req })),
        validarCampos
    ], httpComprador.putcomprador)
    

    
    export default comprador