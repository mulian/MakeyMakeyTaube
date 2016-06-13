import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../api/booth/db.js'

var config = null;
var sounds = {};
Template.game.onCreated(function() {
  config = Config.findOne({});
  if(config.soundOnCollect!=undefined && config.soundOnCollect!='undefined')
    sounds.soundOnCollect = new Audio(Sounds.findOne({_id:config.soundOnCollect}).url);
  if(config.soundOnWin!=undefined && config.soundOnWin!='undefined')
    sounds.soundOnWin = new Audio(Sounds.findOne({_id:config.soundOnWin}).url);
  if(config.soundOnLose!=undefined && config.soundOnLose!='undefined')
    sounds.soundOnLose = new Audio(Sounds.findOne({_id:config.soundOnLose}).url);
});

export var play = {
  soundOnCollect: function() {
    if(sounds.soundOnCollect!=undefined) {
      sounds.soundOnCollect.play();
    }
  },
  soundOnWin: function() {
    if(sounds.soundOnWin!=undefined) {
      sounds.soundOnWin.play();
    }
  },
  soundOnLose: function() {
    if(sounds.soundOnLose!=undefined) {
      sounds.soundOnLose.play();
    }
  },
};

// Template.game.onRendered(function() {
//   var first=true;
//   Tracker.autorun(function() {
//     Session.get('collectitems');
//     if(first) first=false;
//     else {
//       play.soundOnCollect();
//     }
//   })
// });
