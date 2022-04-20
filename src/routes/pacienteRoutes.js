import express from "express";
const router = express.Router();
import { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/PacienteController.js'
import chekAuth from '../../middleware/authMiddleware.js';

router.route ('/')
    .post(chekAuth, agregarPaciente)
    .get(chekAuth, obtenerPacientes);

router.route ('/:id')
    .get(chekAuth, obtenerPaciente)
    .put(chekAuth, actualizarPaciente)
    .delete(chekAuth, eliminarPaciente);

export default router;