//require twilio and create REST client
var client = require('twilio');
var path = require('path');
var bodyParser = require('body-parser');
//require express
//setup express
var express = require('express');

var cors = require('cors');

var app = express();
app.set('port', process.env.PORT || 3000);
var server = require('http').Server(app);

server.listen(app.get('port'));


//Front-end admin page:
//Enter a person's name
//based on the name, grab a phone number from text file, csv, object in the code, etc.
//check boxes for 5 different sentences
//check box 1 would grab sentence 1

//serve static file
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', express.static('public'));

//get post request from client with input values to send to twilio
app.post('/twilio', function (req, res) {
  console.log('twilio hit ' + req.body.num); //
  sendText(req.body.name, req.body.num, req.body.txt); //pass values to sendText method
});



function sendText(name, num, txt){

  //Send an SMS text message
  client.sendMessage({

      to: num, // Any number Twilio can deliver to
      from: '+13472692702', //our twilio number
      body: name + ', ' + txt // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

      if (!err) { // "err" is an error received during the request, so if there's no error

        // "responseData" is a JavaScript object containing data received from Twilio.
        console.log("This is a message from: " + responseData.from);
        console.log("Their message is " + responseData.body); 

      }
    });
}

