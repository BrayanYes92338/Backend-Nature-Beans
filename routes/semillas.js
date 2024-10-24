import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import httpSemillas from "../controllers/semillas.js";
import helperSemillas from "../helpers/semillas.js";

const semilla = Router();

semilla.get("/listar", httpSemillas.getSemillas);

semilla.get("/listarid/:id", [
  check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
  check('id').custom(helperSemillas.validarSemillaID),
  validarCampos
], httpSemillas.getSemillaID);

semilla.get("/listarProveedores/:id",[
  validarCampos
],httpSemillas.getSemillasProveedores);

semilla.get("/activos", [validarCampos], httpSemillas. getSemillaActiva);
semilla.get("/inactivos", [validarCampos], httpSemillas.geSemillaInactiva);

semilla.post("/agregar",[
  check('idFinca', 'Se id Finca no puede estar vacio').notEmpty(),
  check('registro_ICA', 'registro_ICA no puede estar vacio').notEmpty(),
  check('registro_Invima', 'registro_Invima no puede estar vacio').notEmpty(),
  check('fechaVencimiento', 'fechaVencimiento no puede estar vacio').notEmpty(),
  check('especie', 'especie no puede etar vacio').notEmpty(),
  check('numLote', 'numLote no puede etar vacio').notEmpty(),
  check('origen', 'origen no puede estar vacio').notEmpty(),
  check('poderGerminativo', 'poderGerminativo no puede estar vacio').notEmpty(), 
  validarCampos
], httpSemillas.postSemilla);

semilla.put("/editar/:id",[
  check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
  check('id').custom(helperSemillas.validarSemillaID),
  validarCampos
], httpSemillas.putSemilla);
semilla.put("/activar/:id", [validarCampos], httpSemillas.putSemillaActiva);

semilla.put(
  "/desactivar/:id",
  [validarCampos],
  httpSemillas.putSemillaDesactivar);
export default semilla;
