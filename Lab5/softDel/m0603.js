const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');

function send(senderEmail, receiverEmail, msg) {

    let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: senderEmail,
            pass: "ptxblndoiksipgbn"
        }
    }));

    var mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: 'laba6',
        text: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        error ? console.log(error) : console.log('Email sent: ' + info.response);
    })
}

module.exports = {
    send: send
}