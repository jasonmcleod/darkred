var path           = require('path');
var templatesDir   = path.resolve(__dirname, '..', 'templates')
var emailTemplates = require('email-templates');
var nodemailer = require("nodemailer");

var Email = function(options, cb) {

    var transport = nodemailer.createTransport("SMTP", {
        host: "smtp.jasonmcleod.me", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "noreply@jasonmcleod.me",
            pass: "titsorgtfo"
        }
    });

    emailTemplates(templatesDir, function(err, template) {

        if(err) console.log(err)

        template(options.template, options.locals, function(err, html, text) {

        if(err) console.log(err)

            var mailOptions = {
                from: "Derplord 9000 <noreply@derplord.com>",
                to: options.to,
                subject: options.subject,
                text: text,
                html: html
            }

            transport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }

                cb(error, response)

                transport.close(); // shut down the connection pool, no more messages
            });

        });

    });

    return this
}

module.exports = Email