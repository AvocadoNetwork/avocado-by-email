const express=require("express");
const app=express();
const cors=require("cors");
var bodyParser=require("body-parser");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
// parse application/json
app.use(bodyParser.json());
//utility function
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};
//..........routes................//
app.use(express.json())
app.post("/mail",function(req,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        /**
         * Please enter personal/company gmail address and password here to send the email via nodemailer
         * For security purposes I have removed my email and password
         */
        auth: {
          //enter here
          user: '',
          pass: ''
        }
      });
      readHTMLFile(__dirname + '/templates/email.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             address: req.query.address
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
          from: 'AvoByEmail',
          to: req.query.email,
          subject: 'AvoByEmail',
          text: 'AvoByEmail',
          html:htmlToSend
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send("1");
          }
        });
    });
     
})
app.listen("5000");