var nodemailer = require('nodemailer');
var pug = require('pug');

class Email {
    constructor() {

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
            from: 'iConWebsite@gmail.com',
            to: this.user.email,
            subject: this.subject,
            html: this.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    sendWelcome(user) {
        this.user = user
        this.subject = "Welcome To iCon"

        var body = `<h2> Hi, ${this.user.name}</h2>
            <h1>Welcome to iCon</h1>
            <h3>Check Your profile<h3/>`

        this.html = this.getBaseHtml().replace("{%BODY%}", body)

        this.sendMail()
    }

    sendToken(user, tempPassword) {
        this.user = user
        this.subject = "Temporary Password"
        var body = `
        <h2> Hi, ${this.user.name}</h2>
        <p>We have received your password reset request.</p>
        <p>Below we have given you temporary password to reset your actual password. Click the given link to change password</p>
        <p class="note">NOTE: Temp. password will be expired in 10 mins.</p>
        <p> Temporary Password </p>
        <h2 class="box">${tempPassword}</h2>
        <h3>Change Your Password<h3 />`
        this.html = this.getBaseHtml().replace("{%BODY%}", body)
        this.sendMail()
    }

    sendUpdateProfile(user) {
        this.user = user
        this.subject = "Profile Updated"
        var body = `
        <h2> Hi, ${this.user.name}</h2>
        <p>Your information has been updated</p>
        <h3>Check your profile here<h3 />`
        this.html = this.getBaseHtml().replace("{%BODY%}", body)
        this.sendMail()
    }

    sendUpdatePassword(user) {
        this.user = user
        this.subject = "Password Updated"
        var body = `
        <h2> Hi, ${this.user.name}</h2>
        <p>Your password has been updated</p>
        <h3>Check your profile here<h3 />`

        this.html = this.getBaseHtml().replace("{%BODY%}", body)
        this.sendMail()
    }

    getBaseHtml() {
        return (
            `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
            
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                        text-align: center;
                    }
            
                    html {
                        font-family: 'Roboto', sans-serif;
                    }
            
                    input,
                    button {
                        outline: none;
                        border: none;
                        font-family: inherit;
                    }
            
                    a {
                        display: inline-block;
                        text-decoration: none;
                        position: relative;
                    }
            
                    body {
                        background: #eeeeee;
                        padding: 1rem;
                    }
            
                    h1 {
                        color: #00ba93;
                        margin: .7rem;

                    }
            
                    h2 {
                        color: #fcb332
                    }
            
                    p {
                        margin: .5rem;
                    }
            
                    .link {
                        display: block;
                        color: #00ba93;
                        margin: .5rem 0;
                    }
            
                    .note {
                        color: red;
                    }
            
                    .box {
                        background: #00ba93;
                        color: white;
                        display: inline-block;
                        padding: .5rem 1rem;
                        margin: 1rem;
                    }
                </style>
            </head>
            
            <body>
                {%BODY%}
            </body>
            
            </html>`
        )
    }
}



module.exports = Email