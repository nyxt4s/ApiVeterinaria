import Veterinario from "../models/veterinario.js";
import generarJWT from "../../helpers/generajwt.js";
import generarID from "../../helpers/generarId.js";
import emailRegistro from "../../helpers/emailRegistro.js";
import EmailOlvidePassword from "../../helpers/olvidePassword.js";

const registrar = async (req, res) =>{

  try{ 

    // prevenir usuario duplicado
    const { email, nombre  } = req.body;

    const existeUsuario = await Veterinario.findOne({email : email});

    if (existeUsuario){
    const error = new Error ("Usuario ya registrado :(");
    return res.status(400).json ({msg: error.message });

    }else{

    // guardar un nuevo usuario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await  veterinario.save();
    // enviar el correo al usuario de registro
    emailRegistro( { email, nombre, token: veterinarioGuardado.token } );
    res.json({msg: "Usuario Registrado"});
   }
  }
  catch(ex){
      const error = new Error ("ocurrio un problema con el servidor, intente mas tarde");
      return res.status(404).json ({msg: error.message });

  };

};

const perfil = (req, res) => {
  
    const { veterinario } = req;  
    res.json({ veterinario });
  }



const autenticar = async (req, res) => {

  const { email, password } =  req.body;

  const usuario = await Veterinario.findOne({email : email});

  // validar usuario existe o no
  if (!usuario){
    const error = new Error ("Usuario no Existe o no Valido");
    return res.status(404).json({msg : error.message});
  }else {
    // validar cuenta confirmada
    if (!usuario.confirmado){
      console.log(usuario.confirmado);
      const error = new Error('Tu cuenta no ha sido confirmada');
      return res.status(403).json({msg : error.message});
    }
    // validar password
    if (await usuario.comprobarPasword(password)){
     
      res.json({
        msg: "Usuario logeado correctamente",
        token: generarJWT(usuario.id)
      });

    }else {
        const error = new Error ('Email o password incorrecto');
        return res.status(403).json({msg: error.message});
   
    }
  

  }




}

const confirmar = async (req, res) =>{
    const { token } = req.params;
    
    const usuarioConfirmar = await Veterinario.findOne({token: token});
    
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

const recuperarPassword = async (req, res) =>{

    const { email, password} = req.body; 
    const existeVeterinario = await Veterinario.findOne({email : email});

    if (!existeVeterinario){
      const error = new Error ('El usuario no existe');
      return res.status(400).json({msg: error.message});
    }
    try {
      existeVeterinario.token = generarID();
      await existeVeterinario.save();
      EmailOlvidePassword({email, nombre : existeVeterinario.nombre, token : existeVeterinario.token });
      res.json({msg: "hemos enviado un Email con las intrucciones"});
    }catch(ex){

    }

}


const comprobarToken = async (req, res) =>{
      const { token } = req.params;
      const tokenValido = await Veterinario.findOne({ token: token})

      if (tokenValido){
        // el usuario existe
        res.json({msg: "token valido, el usuario existe"});
      }else {
        const error = new Error("token no valido");
        return res.status(400).json({msg: error.message});
      }
}


const nuevoPassword = async (req, res) =>{

  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({msg: error.message});
  }
  try {
    veterinario.token = null;
    veterinario.password = password;
    const resultado = await veterinario.save();
    res.json ({msg: "contraseña modificado correctamente"});
  }catch(ex){
    console.log(ex);

  }
}

export {
    registrar,
    autenticar,
    confirmar,
    perfil,
    recuperarPassword,
    comprobarToken,
    nuevoPassword
};