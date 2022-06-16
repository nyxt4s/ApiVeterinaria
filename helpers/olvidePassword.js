import nodemailer from "nodemailer";

const EmailOlvidePassword = async ( datos ) => {
    // Credenciales
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
 
      const { email, nombre, token } = datos;
    // Envio de email
       
    const info = await transport.sendMail( {
      from : "Valkmoons - Administrador de pacientes veterinarias" ,
      to : email,
      subject : "restablece tu password",
      text : 'Compruebe su cuenta en APV',
      html: `<p> Hola ${nombre}, has solicitado restablecer tu contraseña. </p>
            <p> sigue el siguiente enlace, rellena el campo para restablecer tu contraseña
              <a href="${process.env.FRONTURL}/OlvidePassword/${token}">Restablecer contraseña. </a>
            <p> Si tu no creaste esta cuenta, solo ignora este correo</p>` 
     }, (errs, infos) => {
       console.log('1', infos.envelope);
       console.log('2', infos.messageId);
     });
    //  console.log('mensaje enviado, %s', info.messageId);
    //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default EmailOlvidePassword