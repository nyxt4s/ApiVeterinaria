import express from "express";
const router = express.Router();
import { registrar, autenticar, confirmar, perfil} from "../controllers/veterinaroController.js";

router.post("/registrar", registrar);

router.get("/perfil", perfil);

router.get("/confirmar/:token", confirmar);

router.get("/login", autenticar);

export default router;