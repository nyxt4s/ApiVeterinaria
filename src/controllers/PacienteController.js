import Paciente from "../models/pacientes.js";


// POST
const agregarPaciente = async (req, res) => {
  
    const paciente = new Paciente(req.body); 

    paciente.veterinario = req.veterinario._id;

    try {
       const pacienteGuardado = await paciente.save();
     
       res.json(pacienteGuardado);
    }catch (error){
        console.log(error);

    } 
}

// GET
const obtenerPacientes = async  (req, res) => {
    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario);;
    res.json(pacientes);
}


// GET
const obtenerPaciente = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    console.log(paciente.veterinario._id.toString());
    console.log(req.veterinario._id.toString());

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
      return  res.json({ msg: 'accion no valida'});
    }
    if (paciente){
        return res.json(paciente);
    }else {
        res.status(404).json({msg: "Paciente no encontrado"});
    }

    console.log(paciente);

}

// PUT

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente){
        return res.status(404).json({msg: "No Encontrado"});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({ msg: "Accion no Valida"});
    }

    paciente.nombre  = req.body.nombre; 
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.email = req.body.email || paciente.email;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json({msg: "paciente actualizado", pacienteActualizado});

    }catch(ex){
        console.log(ex);
    }

}

// DELETE

const eliminarPaciente = async (req, res) => {
    
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente){
        return res.status(404).json({msg: "No Encontrado"});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({ msg: "Accion no Valida"});
    }

    try {
      await paciente.deleteOne();
      return res.json({ msg: "Paciente Eliminado"});

    }catch(ex){
        console.log(ex);
    }


}


export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}