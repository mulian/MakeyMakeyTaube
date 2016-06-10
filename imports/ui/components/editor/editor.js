import './editor.html'
import './editor.less'

import '../file/file.js'
import '../file-drop/file-drop.js'

import {Games,Players,CollectItems,Sounds,Config} from '../../../api/booth/db.js'

Template.editor.helpers({
  games: function() {
    return Games.find({},{sort:{order:1}});
  },
  getConfig: function() {
    return Config.find({});
  },
});
var currentFileChoose = null;
Template.editor.events({
  'mouseenter li': function(e,instance) {
    $(e.target).addClass('selected');
  },
  'mouseleave li': function(e,instance) {
    $(e.target).removeClass('selected');
  },
  'click .newGame':function(e,instance) {
    Games.insert({name:'SpielName?',id:'gameId?'})
  },
  'blur input': function(e,instance) {
    var target = $(e.target);
    enterInput(target,instance,this);
  },
  'keypress input': function(e,instance) {
    var target = $(e.target);
    if(e.keyCode==13) {
      enterInput(target,instance,this);
    }
  },
  'click button': function(e,instance) {
    console.log("click sounds");
    $('#files').show();
    var target = $(e.target);
    if(target.hasClass('soundColected')) {
      currentFileChoose = 'soundOnCollect';
    } else if(target.hasClass('soundWin')) {
      currentFileChoose = 'soundOnWin';
    } else if(target.hasClass('soundLose')) {
      currentFileChoose = 'soundOnLose';
    }
  },
  'click .removeGame': function(e,instance) {
    Games.remove({_id:this._id});
  },
  'click .sound': function(e,instance) {
    $('#files').hide();
    var target = $(e.target);
    var config = Config.findOne({});
    switch(currentFileChoose) {
      case 'soundOnCollect':
        // target.attr('db-id');
        Config.update({_id:config._id},{$set:{soundOnCollect:target.attr('db-id')}})
        break;
      case 'soundOnWin':
        // target.attr('db-id');
        Config.update({_id:config._id},{$set:{soundOnWin:target.attr('db-id')}})
        break;
      case 'soundOnLose':
        // target.attr('db-id');
        Config.update({_id:config._id},{$set:{soundOnLose:target.attr('db-id')}})
        break;
    }
    currentFileChoose = null;
  }
});

Template.showGames.onCreated(function () {
  this.gameTitleTemp = new ReactiveVar('showGameName');
  this.gameIdTemp = new ReactiveVar('showGameId');
  this.gameOrderTemp = new ReactiveVar('showOrderNr');
});
Template.showGames.helpers({
  gameTitleTemplate: function() {
    return Template.instance().gameTitleTemp.get();
  },
  gameIdTemplate: function() {
    return Template.instance().gameIdTemp.get();
  },
  gameOrderTemplate: function() {
    return Template.instance().gameOrderTemp.get();
  }
});
function enterInput(target,instance,_this) {
  if(target.hasClass('gameId')) {
    Games.update({_id:_this._id},{$set:{id:target.val()}});
    instance.gameIdTemp.set('showGameId');
  } else if(target.hasClass('gameTitle')) {
    Games.update({_id:_this._id},{$set:{name:target.val()}})
    instance.gameTitleTemp.set('showGameName');
  } else if(target.hasClass('gameOrder')) {
    Games.update({_id:_this._id},{$set:{order:parseInt(target.val())}})
    instance.gameOrderTemp.set('showOrderNr');
  } else if(target.hasClass('timeMin')) {
    // console.log("set Time");
    Config.update({_id:_this._id},{$set:{gameMin:parseInt(target.val())}});
  } else if (target.hasClass('timeSec')) {
    Config.update({_id:_this._id},{$set:{gameSec:parseInt(target.val())}});
  } else if(target.hasClass('topTeamsCount')) {
    Config.update({_id:_this._id},{$set:{topTeamsCount:parseInt(target.val())}});
  }
}
Template.showGames.events({
  'click .gameTitle': function(e,instance) {
    instance.gameTitleTemp.set('changeGameName');
  },
  'click .gameId': function(e,instance) {
    instance.gameIdTemp.set('changeGameId');
  },
  'click .gameOrder': function(e,instance) {
    instance.gameOrderTemp.set('changeOrderNr');
  },
  'keypress input': function(e,instance) {
    var target = $(e.target);
    if(e.keyCode==13) {
      // console.log(this);
      enterInput(target,instance,this);
    }
  },
  'blur input': function(e,instance) {
    var target = $(e.target);
    enterInput(target,instance,this);
  },
});

Template.changeGameName.onRendered(function() {
  $(this.find('input')).select();
});
Template.changeGameId.onRendered(function() {
  $(this.find('input')).select();
});
Template.changeOrderNr.onRendered(function() {
  $(this.find('input')).select();
});
