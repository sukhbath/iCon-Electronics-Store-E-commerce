var nodemailer = require('nodemailer');

class Email {
    constructor(user) {
        this.user = user
    }

    sendMail() {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sukhbatth6062@gmail.com',
                pass: 'myGm@!lp@ssw0rd'
            }
        });



        var mailOptions = {
            from: 'sukhbatth6062@gmail.com',
            to: 'sukhbatth6062@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    sendWelcome() {
        sendMail('welcome')
    }
}