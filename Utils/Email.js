var nodemailer = require('nodemailer');

module.exports = function (message) {


    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "57ad37dcff662d",
            pass: "c8ccfa4a0fa7d7"
        }
    });

    var mailOptions = {
        from: 'electronicStore@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: message
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}