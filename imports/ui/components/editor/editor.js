import './editor.html'
import './editor.less'

import {pickFile} from '../file/file.js'
import '../file-drop/file-drop.js'

import {Crosshair,Games,Players,CollectItems,Sounds,Config,Images} from '../../../api/booth/db.js'

import './editor-setsound.js'
import './editor-input.js'

Template.editor.helpers({
  games: function() {
    return Games.find({},{sort:{order:1}});
  },
  getConfig: function() {
    return Config.find({});
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
    Crosshair.insert({x:20,y:20,width:50,img:Images.findOne({}).url,goal:{
      left: 45, top: 45, right: 45, bottom: 45,
    }},(err,id) => {
      Games.insert({name:'SpielName?',path:'path',img:'',crosshair:id});
    });
  },
  'click .removeGame': function(e,instance) {
    Games.remove({_id:this._id});
  },
  'click .resetHighscore': function(e,i) {
    console.log('reset');
    Meteor.call('resetHighscore');
  },
});


Template.showGames.events({
  'dblclick': function(e,instance) {
    Router.go('editor',{_gameID:instance.data.path})
  },
});
