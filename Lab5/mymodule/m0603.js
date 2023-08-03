const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');

function send(senderEmail, receiverEmail, msg) {

    console.log(senderEmail)
    console.log(receiverEmail)
    console.log(msg)

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
    // const transporter = nodemailer.createTransport({
    //     service: "yandex",
    //     auth: {
    //         user: senderEmail,
    //         pass: "qfbdwxzomysbkdan"
    //     }
    // })

    // const mailOptions = {
    //     from: senderEmail,
    //     to: receiverEmail,
    //     subject: 'I am full stack Developer, trust me',
    //     text: msg
    // }

    // transporter.sendMail(mailOptions)
}

module.exports = {
    send: send
}