/*eslint-env node*/
"use strict";

var express = require('express');
var cfenv = require('cfenv');
var watson = require('watson-developer-cloud');

var app = express();

var natural_language_classifier = null;

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public'));

////API Routes Config////
var apiRouter = express.Router(); 
apiRouter.use(function(req, res, next) {//Middleware
  natural_language_classifier = natural_language_classifier || watson.natural_language_classifier({
    url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
    username: 'ae641e65-28bc-4835-a14e-7fa6cc104981',
    password: 'J1EVZ0Xvq3e0',
    version: 'v1'
  });
  next(); 
});

//TODO insert voodoo magic and map classes to answers from DB... but for now lets go with harcoded values.
apiRouter.route('/ask/:text')//GET
    .get(function(req, res) {
      natural_language_classifier.classify({
        text: req.params.text,
        classifier_id: 'be05f9x94-nlc-2409' 
      },
      function(err, response) {
        if (err)
          res.send(err);
        else{

          switch (response.top_class) {
            case "personal":
              response.answer = "Not sure about that, but I can tell you I'm awesome."
              break;
            case "interview":
              response.answer = "I hope we already established that I'm awesome, but I like to work for <Insert your company name here>."
            break;
            default:
              break;
          }
          res.json(response);
        }
        });
    });

apiRouter.route('/status')//GET
    .get(function(req, res) {
      natural_language_classifier.status({
        classifier_id: 'be05f9x94-nlc-2409' 
      },
      function(err, response) {
        if (err)
          res.send(err);
        else{
          response.answer =  response.status_description;
          res.json(response);
        }
      });
    });
app.use('/api', apiRouter);

var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
