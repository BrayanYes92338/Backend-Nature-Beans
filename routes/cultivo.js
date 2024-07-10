import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";
import httpCultivo from "../controllers/cultivo.js";
import helperCultivo from "../helpers/cultivo.js";

const router = Router();

router.get("/lista", [validarCampos], httpCultivo.getCultivo);
router.get("/activos", [validarCampos], httpCultivo.getCultivoActivo);
router.get("/inactivos", [validarCampos], httpCultivo.getCultivoActivo);
router.post("/agregar", [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("idParcela", "El id de la Parcela no puede estar vacio").notEmpty(),
    validarCampos,
  ],
  httpCultivo.postCultivo
);
router.put( "/editar/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helperCultivo.validarExistaCultivoId),
    validarCampos,
  ],
  httpCultivo.putCultivo
);
router.put('/activar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helperCultivo.validarExistaCultivoId),
  validarCampos 
], httpCultivo.putCultivoaActivar)

router.put('/desactivar/:id',[ 
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helperCultivo.validarExistaCultivoId),
  validarCampos 
], httpCultivo.putCultivoDesactivar)



export default router;
