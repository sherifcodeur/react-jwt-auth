

const nodemailer = require('nodemailer')


const sendEmail = (options) =>{


    const transporter = nodemailer.createTransport({

        service: "Gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

   
    const mailOptions = {
        from: process.env.APP_NAME,
        to: options.to,
        subject: options.subject,
        html: options.text,
      };

    
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });


}


module.exports = sendEmail