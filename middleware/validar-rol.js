export const validarRol = ( rol ) =>{
    try {
        return (req, res, next ) =>{
            let validate = false;
            const usuario = req.usuario;
            for (let i = 0; i < rol.length; i++) {
                const roles = rol[i];
                if (usuario.rol === roles) {
                    validate = true;
                }
            }
            if (validate === true) {
                return next();  
            } else {
                return res.status(401).json({
                message: "No tienes los suficientes permisos"
                }); 
            }
        }
    } catch (error) {
        res.status(500).json({error});
    }
}