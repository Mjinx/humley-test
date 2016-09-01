/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var cors = require('cors');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();


var watson = require('watson-developer-cloud');
var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: 'ae641e65-28bc-4835-a14e-7fa6cc104981',
  password: 'J1EVZ0Xvq3e0',
  version: 'v1'
});



// serve the files out of ./public as our main files
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public'));



var router = express.Router(); 
router.use(function(req, res, next) {
    //console.log('Something is happening.');
    next(); 
});
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
router.route('/ask/:text')
    .get(function(req, res) {
      natural_language_classifier.classify({
        text: req.params.text,
        classifier_id: 'be05f9x94-nlc-2409' 
      },
      function(err, response) {
        if (err)
          res.send(err);
        else
          res.json(response);
        });
    });
router.route('/status')
    .get(function(req, res) {
      natural_language_classifier.status({
        classifier_id: 'be05f9x94-nlc-2409' 
      },
      function(err, response) {
             if (err)
          res.send(err);
        else
          res.json(response);
        });
    });
app.use('/api', router);


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
