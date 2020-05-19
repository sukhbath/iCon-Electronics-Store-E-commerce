var nodemailer = require('nodemailer');
var pug = require('pug');



class Email {
    constructor(view) {
        this.view = view
    }

    setTransporter() {
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
        }
    }

    setMailOptions(html) {
        this.mailOptions = {
            from: 'electronicStore@gmail.com',
            to: this.user.email,
            subject: 'Sending Email using Node.js',
            html
        };
    }

    sendMail() {

        var html = pug.renderFile(`${__dirname}/../Public/Views/email/${this.view}.pug`, {
            name: this.user.name
        })
        this.setMailOptions(html)
        this.setTransporter()
        this.transporter.sendMail(this.mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


    sendWelcomeEmail(user) {
        this.view = 'welcome'
        this.user = user
        this.sendMail()
    }


}

var email = new Email()
email.sendWelcomeEmail({
    email: 'merijaan@mail.com',
    name: "jaan"
})