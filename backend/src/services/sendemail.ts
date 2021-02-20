
import nodemailer from "nodemailer";
import config from '../config/email';

class Mail {

  constructor(
    public to?: string,
    public subject?: string,
    public message?: string) { }


  sendMail() {

    let mailOptions = {
      from: "rogerio@designhope.com.br",
      to: this.to,
      subject: this.subject,
      html: this.message
    };

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password
      },
      tls: { rejectUnauthorized: false }
    });


    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return error;
      } else {
        return "E-mail enviado com sucesso!";
      }
    });
  }


}

export default new Mail;