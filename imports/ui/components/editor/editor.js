import './editor.html'
import './editor.less'

import {Games,Players,CollectItems,Sounds} from '../../../api/booth/db.js'

Template.editor.helpers({
  games: function() {
    return Games.find({});
  },
  sounds: function() {
    return Sounds.find({});
  },
});

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
  },
  'click .removeGame': function(e,instance) {
    Games.remove({_id:this._id});
  },
});

Template.showGames.onCreated(function () {
  this.gameTitleTemp = new ReactiveVar('showGameName');
  this.gameIdTemp = new ReactiveVar('showGameId');
});
Template.showGames.helpers({
  gameTitleTemplate: function() {
    return Template.instance().gameTitleTemp.get();
  },
  gameIdTemplate: function() {
    return Template.instance().gameIdTemp.get();
  },
});
function enterInput(target,instance,_this) {
  if(target.hasClass('gameId')) {
    Games.update({_id:_this._id},{$set:{id:target.val()}});
    instance.gameIdTemp.set('showGameId');
  } else if(target.hasClass('gameTitle')) {
    Games.update({_id:_this._id},{$set:{name:target.val()}})
    instance.gameTitleTemp.set('showGameName');
  } else if(target.hasClass('timeMin') || target.hasClass('timeSec')) {
    console.log("set Time");
  }
}
Template.showGames.events({
  'click .gameTitle': function(e,instance) {
    instance.gameTitleTemp.set('changeGameName');
  },
  'click .gameId': function(e,instance) {
    instance.gameIdTemp.set('changeGameId');
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
