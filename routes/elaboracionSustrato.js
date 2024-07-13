import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import httpSustrato from "../controllers/elaboracionSustrato.js";
import helperSustrato from "../helpers/elaboracionSustrato.js";

const router = Router();

router.get("/listar", [validarCampos], httpSustrato.getSustrato);

router.get("/listar/:id", [validarCampos], httpSustrato.getSustratoID);

router.post(
  "/agregar",
  [
    check("idProceso", "el ID del proceso no puede estar vacio").notEmpty(),
    check(
      "idEmpleadooperario",
      "El ID del operario no puede estar vacio"
    ).notEmpty(),
    check(
      "idEmpleadoresponsable",
      "El ID del responsable no puede estar vacio"
    ).notEmpty(),
    check(
      "productocomercial",
      "el producto comercial no puede estar vacio"
    ).notEmpty(),
    check(
      "ingredienteActivo",
      "el ingrediente activo no puede estar vacio"
    ).notEmpty(),
    check(
      "dosisUtilizada",
      "La la dosis utilizada  no puede estar vacia"
    ).notEmpty(),
    check(
      "MetodoAplicacion",
      "El metodo de aplicacion  no puede estar vaci"
    ).notEmpty(),

    
    validarCampos,
  ],
  httpSustrato.postSustrato
);

router.put(
  "/editar/:id",
  [
    check("id", "se necesita un mongoID que sea valido").isMongoId(),
    check("id").custom(helperSustrato.validarSustratoID),
    validarCampos,
  ],
  httpSustrato.putSustrato
);

export default router;
