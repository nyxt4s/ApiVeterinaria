import jwt from "jsonwebtoken";
import Veterinario from "../src/models/veterinario.js";

const chekAuth = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
            // res.json({msg: "mostrando perfil"});
            return next();
        }catch (e){
            const error = new Error ("Token no valido ");
            res.status(403).json({msg: e.message});

        }
        console.log("desde mi middleware");

    }

    if (!token){
    const error = new Error ("Token no valido o inexistente");
     res.status(403).json({msg: error.message});
    }
     next();
}


export default chekAuth;