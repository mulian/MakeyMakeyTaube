var audio = null
if(Meteor.isClient) {
  var audio = new Audio('/sounds/ready.wav');
  audio.volume = 0.5;
}

Meteor.methods({
  'sound_ready': function() {
    if(Meteor.isClient) audio.play();
  }
});
