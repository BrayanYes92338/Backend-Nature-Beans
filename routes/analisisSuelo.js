import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import httpAnalisisSuelo from "../controllers/analisisSuelo.js";

const analisis = Router();

analisis.get("/listar", [validarCampos], httpAnalisisSuelo.getAnalisis);
analisis.get("/listarid/:id", [validarCampos], httpAnalisisSuelo.getAnalisisId);
analisis.get(
  "/listarResponsable/:id",
  [validarCampos],
  httpAnalisisSuelo.getResponsables
);

analisis.post(
  "/agregar",
  [
    check("idParcela", "El ID de la parcela no puede estar vacío").notEmpty(),
    check("idEmpleado", "El ID del empleado no puede estar vacío").notEmpty(),
    check("muestra", "El campo muestra no puede estar vacío").notEmpty(),
    check("laboratorio", "El campo laboratorio no puede estar vacío").notEmpty(),
    check("resultados").isArray().withMessage("Los resultados deben ser un array"),
    validarCampos
  ],
  httpAnalisisSuelo.postAnalisis
);

analisis.put(
  "/editar/:id",
  [
    check("idParcela", "El ID de la parcela no puede estar vacío").notEmpty(),
    check("idEmpleado", "El ID del empleado no puede estar vacío").notEmpty(),
    check("muestra", "El campo muestra no puede estar vacío").notEmpty(),
    check("laboratorio", "El campo laboratorio no puede estar vacío").notEmpty(),
    check("id", "Se necesita un mongoid valido").isMongoId(), 
  ],
  httpAnalisisSuelo.putAnalisis
);
analisis.get("/fechas", httpAnalisisSuelo.getAnalisisEntreFechas);
export default analisis;
