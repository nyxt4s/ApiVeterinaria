import Veterinario from "../models/veterinario.js";


const registrar = async (req, res) =>{

  try{ 

    // prevenir usuario duplicaco
    const { email } = req.body;

    const existeUsuario = await Veterinario.findOne({email : email});

    if (existeUsuario){
    const error = new Error ("Usuario ya registrado :(");
    return res.status(400).json ({msg: error.message });

    }else{

    // guardar un nuevo usuario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await  veterinario.save();
    res.json({msg: "Usuario Registrado"});
   }
  }
  catch(ex){
        console.log(ex);
  };

};

const perfil = (req, res) => {
    res.json({msg: "Usuario Roderick"});
}

const autenticar = (req, res) => {
  res.json({msg: "Usuario Roderick"});
}

const confirmar = async (req, res) =>{
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token: token});
    console.log(usuarioConfirmar);
    
    if (usuarioConfirmar){ 

       res.json ({msg: "Usuario confirmado"}); 
    }else{
      const error = new Error("Token no valido");
      return res.status(404).json({msg: "Token no valido"});;
    }

    try {
      usuarioConfirmar.token = null;
      usuarioConfirmar.confirmado = true;
      await usuarioConfirmar.save();
      res.json({msg: "Usuario confirmado Correctamente"});
    }catch(err){
      console.log(err);

    }
 
}

export {
    registrar,
    autenticar,
    confirmar,
    perfil
};