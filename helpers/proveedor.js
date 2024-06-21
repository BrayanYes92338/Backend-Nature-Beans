import Proveedor from "../models/proveedor.js";

const helperProveedor = {

    validarExistaProveedorID: async (id) => {
        const existe = await Proveedor.findById(id);
        if (existe == undefined) {
            throw new Error("Id del Proveedor no existe")
        }
    },

    CorreoUnicoProveedor: async (correo) => {
        const existe = await Proveedor.findOne({ correo })
        if (existe) {
            throw new Error("Este Correo del Proveedor ya existe")
        }
    }

}

export default helperProveedor