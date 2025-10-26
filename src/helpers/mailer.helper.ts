// Looking to send emails in production? Check out our Email API/SMTP product!
import nodemailer from 'nodemailer';


const {MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASSWORD, SENDER_EMAIL, REPLY_TO} = process.env
var transport = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD
  }
});



export const Mailer = (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: to,
        subject: subject,
        text: text,
        replyTo: REPLY_TO
    }

return transport.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}
