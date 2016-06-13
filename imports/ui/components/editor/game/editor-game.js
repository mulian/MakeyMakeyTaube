import './editor-game.html'
import './editor-game.less'

import {pickFile} from '../../file/file.js';

import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../../api/booth/db.js'

import './editor-game-resize.js'
import './editor-game-move.js'

import notie from 'notie';
import 'notie/dist/notie.css';

function getCurrentGame() {
  var controller = Iron.controller();
  return Games.findOne({path:controller.state.get('gameId')});
}
function getCurrentCrosshair() {
  return Crosshair.findOne({_id:getCurrentGame().crosshair})
}

Template.editor_game.helpers({
  game: function() {
    return getCurrentGame();
  },
  crosshair: function() {
    return getCurrentCrosshair();
  },
  getCollectItems: function() {
    return CollectItems.find({game:this._id});
  },
});

//New Collect Item
Template.editor_game.events({
  'click .ci': function(e,i) {
    CollectItems.insert({
      game: this._id,
      x: 60,
      y: 60,
      width: 50,
      img: Images.findOne({}).url,
    });
  },
  'click .resetHighscore': function(e,i) {
    Meteor.call('resetHighscore',this._id)
  },
  'blur .timeMin': function(e,i) {
    var sec = i.find('.timeSec').value;
    var min = e.target.value;
    if(min=="") min = 0;
    if(sec=="") sec = 0;
    Games.update({_id:this._id},{$set:{timeMin:min,timeSec:sec}});
  },
  'blur .timeSec': function(e,i) {
    var sec = e.target.value;
    var min = i.find('.timeMin').value;
    if(min=="") min = 0;
    if(sec=="") sec = 0;
    Games.update({_id:this._id},{$set:{timeSec:sec,timeMin:min}});
  },
});

// Set image
Template.editor_game.events({
  'dblclick #background_img': function(e,i) {
    pickFile((file,e,i) => {
      Games.update({_id:this._id},{$set:{img:file.url}})
    });
  },
  'dblclick #crosshair': function(e,i) {
    pickFile((file,e,i) => {
      Crosshair.update({_id:this._id},{$set:{img:file.url}})
    });
  },
  'dblclick .collect-item': function(e,i) {
    pickFile((file,e,i) => {
      CollectItems.update({_id:this._id},{$set:{img:file.url}})
    });
  },
});
var once = true;
Template.editor_game.onRendered(function() {
  if(once) {
    notie.alert(1, "Verschiebe das 'Fadenkreuz', die Collectitems und das Ziel. 'mousedown' halten und verschieben..", 5);
    setTimeout(() => {
      notie.alert(1, "Damit sich die größe ändert, einfach die Schwarzen balken an den 'Items' bewegen.", 5);
    },5*1000);
    once=false;
  }
});
