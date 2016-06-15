
import {Crosshair,Games,Players,CollectItems,Sounds,Config,Images} from '../../../api/booth/db.js'

function enterInputEditor(target,instance,_this) {
  if(target.hasClass('timeMin')) {
    Config.update({_id:_this._id},{$set:{gameMin:parseInt(target.val())}});
  } else if (target.hasClass('timeSec')) {
    Config.update({_id:_this._id},{$set:{gameSec:parseInt(target.val())}});
  } else if(target.hasClass('topTeamsCount')) {
    Config.update({_id:_this._id},{$set:{topTeamsCount:parseInt(target.val())}});
  } else if(target.hasClass('move_intervall')) {
    Config.update({_id:_this._id},{$set:{move_intervall:parseInt(target.val())}});
  }
};
Template.editor.events({
  'blur input': function(e,instance) {
    var target = $(e.target);
    enterInputEditor(target,instance,this);
  },
  'keypress input': function(e,instance) {
    var target = $(e.target);
    if(e.keyCode==13) {
      enterInputEditor(target,instance,this);
    }
  },
});

function enterInputGame(target,instance,_this) {
  if(target.hasClass('gameId')) {
    Games.update({_id:_this._id},{$set:{path:target.val()}});
    instance.gameIdTemp.set('showGamePath');
  } else if(target.hasClass('gameTitle')) {
    Games.update({_id:_this._id},{$set:{name:target.val()}})
    instance.gameTitleTemp.set('showGameName');
  } else if(target.hasClass('gameOrder')) {
    Games.update({_id:_this._id},{$set:{order:parseInt(target.val())}})
    instance.gameOrderTemp.set('showOrderNr');
  }
};
Template.showGames.helpers({
  gameTitleTemplate: function() {
    return Template.instance().gameTitleTemp.get();
  },
  gameIdTemplate: function() {
    return Template.instance().gameIdTemp.get();
  },
  gameOrderTemplate: function() {
    return Template.instance().gameOrderTemp.get();
  },
});
Template.showGames.onCreated(function () {
  this.gameTitleTemp = new ReactiveVar('showGameName');
  this.gameIdTemp = new ReactiveVar('showGamePath');
  this.gameOrderTemp = new ReactiveVar('showOrderNr');
});
Template.showGames.events({
  'click .gameTitle': function(e,instance) {
    instance.gameTitleTemp.set('changeGameName');
  },
  'click .gameId': function(e,instance) {
    instance.gameIdTemp.set('changeGamePath');
  },
  'click .gameOrder': function(e,instance) {
    instance.gameOrderTemp.set('changeOrderNr');
  },
  'keypress input': function(e,instance) {
    var target = $(e.target);
    if(e.keyCode==13) {
      enterInputGame(target,instance,this);
    }
  },
  'blur input': function(e,instance) {
    var target = $(e.target);
    enterInputGame(target,instance,this);
  },
});
Template.changeGameName.onRendered(function() {
  $(this.find('input')).select();
});
Template.changeGamePath.onRendered(function() {
  $(this.find('input')).select();
});
Template.changeOrderNr.onRendered(function() {
  $(this.find('input')).select();
});
