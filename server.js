var Echo = require('./api/echo');
var NestApi = require('./api/nest');
var HueApi = require('./api/hue');
var PushApi = require('./api/push');
var express = require('express');
var app = express();


var myEcho = new Echo();
//myEcho.apis.push(new NestApi());
//myEcho.apis.push(new HueApi());
myEcho.apis.push(new PushApi());

var express = require('express');
var app = express();
var interval;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	clearInterval(interval);
	interval = setInterval(function() {
	  myEcho.fetchTasks();
	}, 1500);
  response.send('Echo Listener Running');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


