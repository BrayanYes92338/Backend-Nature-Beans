import {Router} from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpParcela from '../controllers/parcela.js'

const parcela = Router()

parcela.get('/listar',[
    validarCampos
  ],httpParcela.getParcela)

parcela.post('/agregar', [
    validarCampos
], httpParcela.postParcela)



export default parcela