import Empleado from "../models/empleado.js";

const httpEmpleados = {
  getEmpleados: async (req, res) => {
    const { buscar } = req.query;
    const empleado = await Empleado.find({
      $or: [{ nombre: new RegExp(buscar, "i") }]
    });
    res.json({ empleado });
  },
  getEmpleadoActivo: async (req, res) => {
    const empleadoActivo = await Empleado.find({ estado: 1 })
        res.json({ empleadoActivo });
  },
  getEmpleadoInactivo: async (req, res) => {
    const empleadoInactivo = await Empleado.find({ estado: 0 })
    res.json({ empleadoInactivo });
  },
  getEmpleadosID: async (req, res) => {
    const { id } = req.params;
    const empleado = await Empleado.findById(id);
    res.json({ empleado });
  },
  postEmpleado: async (req, res) => {
    try {
      const { nombre, documento, correo, direccion, telefono, estudios, descripcion } = req.body;
      const empleado = new Empleado({ nombre, documento, correo, direccion, telefono, estudios, descripcion });
      await empleado.save();
      res.json({ empleado });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error no se pudo crear el Empleado" });
    }
  },
  putEmpleado: async (req, res) => {
    const { id } = req.params;
    const { nombre, ...resto } = req.body;
    const empleado = await Empleado.findByIdAndUpdate(
      id, { nombre, ...resto }, { new: true });
    res.json({ empleado });
  },
  putEmpleadoActivar: async (req, res) => {
    const { id } = req.params;
    const empleado = await Empleado.findByIdAndUpdate(
      id, { estado: 1 }, { new: true }
    );
    res.json({ empleado });
  },
  putEmpleadoDesactivar: async (req, res) => {
    const { id } = req.params;
    const empleado = await Empleado.findByIdAndUpdate(
      id, { estado: 0 }, { new: true }
    );
    res.json({ empleado });
  },


};

export default httpEmpleados;
