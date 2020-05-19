var nodemailer = require('nodemailer');

class Email {
    constructor() {}



    sendMail() {
        var env = 'dev'
        if (env == 'dev') {
            this.transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "57ad37dcff662d",
                    pass: "c8ccfa4a0fa7d7"
                }
            });

            this.mailOptions = {
                from: 'electronicStore@gmail.com',
                to: 'myfriend@yahoo.com',
                subject: 'Sending Email using Node.js',
                html: 'ok'
            };
        }

        this.transporter.sendMail(this.mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


    sendWelcomeEmail() {
        this.sendMail()
    }


}

var email = new Email()
email.sendWelcomeEmail()