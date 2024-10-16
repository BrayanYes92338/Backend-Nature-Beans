import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import httpPreparacionSuelo from "../controllers/preparacionSuelo.js";

const preparacion = Router();

preparacion.get(
  "/listar",
  [validarCampos],
  httpPreparacionSuelo.getPreparacionSuelo
);
preparacion.get(
  "/listarid/:id",
  [validarCampos],
  httpPreparacionSuelo.getPreparacionID
);
preparacion.get(
  "/listarResponsable/:id",
  [validarCampos],
  httpPreparacionSuelo.getResponsables
);

preparacion.post(
  "/agregar",
  [
    check("idParcela", "El ID de la parcela no puede estar vacío").notEmpty(),
<<<<<<< HEAD
    check("idEmpleadooperario", "El ID del idEmpleadooperario no puede estar vacío").notEmpty(),

    check(
      "productos.*.ingredienteActivo",
      "El ingrediente activo es requerido"
    ).notEmpty(),
    check("productos.*.dosis", "La dosis es requerida").notEmpty(),
    check(
      "productos.*.metodoAplicacion",
      "El método de aplicación es requerido"
    ).notEmpty(),
    check(
      "observaciones",
      "Las observaciones no pueden estar vacías"
    ).notEmpty(),
=======
    check("operario", "El ID del operario no puede estar vacío").notEmpty(),
    check("observaciones","Las observaciones no pueden estar vacías").notEmpty(),
>>>>>>> f8b0006846d9a58160e396d0da8fb884401544f1
    validarCampos,
  ],
  httpPreparacionSuelo.postPreparacionSuelo
);
// preparacion.post(
//   "/agregar",
//   [
//     check("idParcela", "El ID de la parcela no puede estar vacío").notEmpty(),
//     check("idEmpleadooperario", "El ID del operario no puede estar vacío").notEmpty(),
    
//     // Validaciones para productos
//     check("productos.*.ingredienteActivo", "El ingrediente activo es requerido").notEmpty(),
//     check("productos.*.dosis", "La dosis es requerida").notEmpty(),
//     check("productos.*.metodoAplicacion", "El método de aplicación es requerido").notEmpty(),
    
//     // Validación de observaciones
//     check("observaciones", "Las observaciones no pueden estar vacías").notEmpty(),
    
//     validarCampos,
//   ],
//   httpPreparacionSuelo.postPreparacionSuelo
// );
preparacion.put(
  "/editar/:id",

  [
    check("idParcela", "El ID de la parcela no puede estar vacío").notEmpty(),
    check("idEmpleadooperario", "El ID del idEmpleadooperario no puede estar vacío").notEmpty(),
    check(
      "productos.*.ingredienteActivo",
      "El ingrediente activo es requerido"
    ).notEmpty(),
    check("productos.*.dosis", "La dosis es requerida").notEmpty(),
    check(
      "productos.*.metodoAplicacion",
      "El método de aplicación es requerido"
    ).notEmpty(),
    check(
      "observaciones",
      "Las observaciones no pueden estar vacías"
    ).notEmpty(),
    validarCampos,
    check("id", "Se necesita un mongoid valido").isMongoId(),
  ],
  httpPreparacionSuelo.putPreparacionSuelo
);
preparacion.get("/fechas", httpPreparacionSuelo.getPreparacionEntreFechas);
export default preparacion;
