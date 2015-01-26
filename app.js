var Echo = require('./api/echo');
var NestApi = require('./api/nest');
var HueApi = require('./api/hue');
var PushApi = require('./api/push');

var myEcho = new Echo();
//myEcho.apis.push(new NestApi());
//myEcho.apis.push(new HueApi());
myEcho.apis.push(new PushApi());

setInterval(function() {
  myEcho.fetchTasks();
}, 1500);
