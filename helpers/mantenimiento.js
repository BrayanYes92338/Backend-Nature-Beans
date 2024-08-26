import Mantenimiento from '../models/mantenimientos.js';

const helperMantenimiento = {

    validarMantenimientoID: async (id) =>{
        const existe = await Mantenimiento.findById(id);
        if(existe == undefined) {
            throw new Error("Id del Mantenimiento no existe")
        }
    }
    

}

export default helperMantenimiento;