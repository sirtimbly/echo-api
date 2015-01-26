var Task = require('../task');
var PushTask = function() {
  var self = this;
  Task.call(self, 'temperature');
  self.credentials = require('./.credentials');
  self.api = require("instapush");
  self.loggedIn = false;
  self.data = null;

  // register commands
  //self.register('((\\w+)\\s*(\\w+))+ degrees', self.setTemperature);
  self.register('find my phone', self.phone);
  //self.register('away', self.setAway);

  //self.login();
  self.api.settings(self.credentials);
};

PushTask.prototype = Object.create(Task.prototype);
PushTask.prototype.constructor = PushTask;

PushTask.prototype.phone = function() {
  var self = this;
  console.log('Phone location beginning...');
  self.api.notify({
      "event": "Ping",
      "trackers": {
        "device": "home",
        "time": "now"
      },
      function (err, response){
        console.log(response);
      });
    });
}

module.exports = PushTask;