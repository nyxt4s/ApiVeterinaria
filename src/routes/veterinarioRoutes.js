import express from "express";
const router = express.Router();
import { registrar, autenticar, confirmar, perfil, recuperarPassword, comprobarToken, nuevoPassword} from "../controllers/veterinaroController.js";
import chekAuth from "../../middleware/authMiddleware.js";

//Area publica, rutas que no requieren cuenta 
router.post("/registrar", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post('/recuperar-password', recuperarPassword);
router.route("/recuperar-password/:token").post(nuevoPassword).get(comprobarToken);

//Area privada,  rutas que requieren cuenta
router.get("/perfil", chekAuth, perfil);

export default router;