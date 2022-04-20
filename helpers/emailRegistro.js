import nodemailer from "nodemailer";

const emailRegistro = async ( datos ) => {
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
      console.log(transport);
      console.log(datos);
      const { email, nombre, token } = datos;
    // Envio de email
       
    const info = await transport.sendMail( {
      from : "Valkmoons - Administrador de pacientes veterinarias" ,
      to : email,
      subject : "Confirme su cuenta en APV",
      text : 'Compruebe su cuenta en APV',
      html: `<p> Hola ${nombre}, comprueba tu cuenta APV </p>
            <p> Tu cuenta esta lista, solo debes confirmar tu correo pinchando aqui
              <a href="${process.env.FRONTURL}/confirmar/${token}">Comprobar cuenta </a>
            <p> Si tu no creaste esta cuenta, solo ignora este correo</p>` 
     }, (errs, infos) => {
       console.log('1', infos.envelope);
       console.log('2', infos.messageId);
     });
    //  console.log('mensaje enviado, %s', info.messageId);
    //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default emailRegistro