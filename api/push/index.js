var Task = require('../task');
var PushTask = function() {
  var self = this;
  Task.call(self, 'find');
  self.credentials = require('./.credentials');
  var PushBullet = require("pushbullet");
  self.api = new PushBullet(self.credentials.token);
  //self.loggedIn = false;
  self.data = null;
  self.devices = [];
  self.api.devices(function(error, response) {
    self.devices = response.devices;
  });

  // register commands
  //self.register('((\\w+)\\s*(\\w+))+ degrees', self.setTemperature);
  self.register('my phone', self.blowItUp);
  self.register('sloth', self.notifyTim);
  //self.register('away', self.setAway);


  //self.login();
};



PushTask.prototype = Object.create(Task.prototype);
PushTask.prototype.constructor = PushTask;

PushTask.prototype.blowItUp = function() {
  var self = this;
  var pingOne = function() {
    self.api.note(self.devices[0].iden, "Ping!", "Where are you?", function(error,response){
      console.log("pinging " + response + error);
    });
  }
  console.log('Phone location beginning...');
  pingOne();
  setTimeout(pingOne, 3000);
  setTimeout(pingOne, 6000);
  setTimeout(pingOne, 9000);
  
}

PushTask.prototype.notifyTim = function() {
  var self = this;
  self.api.note(self.devices[1].iden, "Echo!", "Notification from Echo", function(error,response){
      console.log("pinging " + response + error);
    });
}

module.exports = PushTask;