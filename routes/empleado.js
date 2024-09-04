import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";
import httpEmpleados from "../controllers/empleado.js";
import helperEmpleado from "../helpers/empleado.js";

const router = Router();

router.get("/listar", [
  validarCampos], httpEmpleados.getEmpleados);

router.get("/activos", [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),validarCampos], httpEmpleados.getEmpleadoActivo);

router.get("inactivos", [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  validarCampos], httpEmpleados.getEmpleadoInactivo);

  router.get("/listar/desc/:descripcion", [
    validarCampos], httpEmpleados.getEmpleadoDescripcion);

router.post("/agregar",[
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("documento", "El documento no puede estar vacio").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("documento").custom(helperEmpleado.documentoUnico),
    check("correo", "El correo no puede estar vacio").notEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(helperEmpleado.CorreoUnico),
    check("telefono", "El telefono no puede estar vacio").notEmpty(),
    check("telefono", "El telefono solo debe llevar números").isNumeric(),
    check("estudios", "El telefono no puede estar vacio").notEmpty(),
    check("descripcion", "El telefono no puede estar vacio").notEmpty(),
    validarCampos,
  ],
  httpEmpleados.postEmpleado
);
router.put("/editar/:id", [
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helperEmpleado.validarExistaEmpleadoId),
    validarCampos,
  ],
  httpEmpleados.putEmpleado
);
router.put('/activar/:id',[
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helperEmpleado.validarExistaEmpleadoId),
  validarCampos 
], httpEmpleados.putEmpleadoActivar)

router.put('/desactivar/:id',[ 
  validarJWT,
  validarRol(["ADMIN", "GESTOR"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helperEmpleado.validarExistaEmpleadoId),
  validarCampos 
], httpEmpleados.putEmpleadoDesactivar)


export default router;
