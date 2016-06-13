import './editor-game.html'
import './editor-game.less'

import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../../api/booth/db.js'

Template.editor.onRendered(function() {
});
Template.editor_game.helpers({
  game: function() {
    var controller = Iron.controller();
    console.log(controller.state.get('gameId'));
    console.log(Games.findOne({id:controller.state.get('gameId')}));
    return Games.findOne({id:controller.state.get('gameId')});
  },
  getCollectItems: function() {
    // console.log(this);
    return CollectItems.find({game:this._id});

  },
  crosshair: function() {
    var game = Games.findOne({_id:this._id});
    if(game.crosshair==undefined) {
      Crosshair.insert({x:20,y:20},function(err,id) {
        Games.update({_id:game._id},{$set:{crosshair:id}});
      });
    } else if(game.crosshair instanceof Object) {
      Crosshair.insert(game.crosshair,function(err,id) {
        console.log("update obj");
        Games.update({_id:game._id},{$set:{crosshair:id}});
      });
    }
    var crosshair = Crosshair.findOne({
      _id: game.crosshair
    });
    console.log(crosshair);
    if(crosshair.startpos!=undefined) {
      Crosshair.update({_id:crosshair._id},{$set:{
        x:crosshair.startpos.x,
        y:crosshair.startpos.y,
        startpos:null
      }});
    }
    // if(crosshair.goal.width==undefined) {
    //   Crosshair.update({_id:crosshair._id},{$set:{
    //     goal: {
    //       left: 20,
    //       top: 20,
    //       right:50,
    //       bottom:50,
    //     }
    //   }});
    }
    return crosshair;
  }
});
function getCurrentGame() {
  var controller = Iron.controller();
  return Games.findOne({id:controller.state.get('gameId')});
}
function getCurrentCrosshair() {
  return Crosshair.findOne({_id:getCurrentGame().crosshair});
}
var currentFile = null;
var moveTarget = null;
var startpos = null;
Template.editor_game.events({
  // 'click .ch': function(e,instance) {
  'dblclick #crosshair': function(e,i) {
    $('.file-manager').show();
    currentFile = {
      type: 'ch',
    };
  },
  'click .bg': function(e,instance) {
    $('.file-manager').show();
    currentFile = {
      type: 'bg',
    };
  },
  'click .ci': function(e,i) {
  // 'dblclick #crosshair': function(e)
    // console.log(this);
    CollectItems.insert({
      game: this._id,
      x: 60,
      y: 60,
      width: 50,
      img: Images.findOne({}).url,
    });
  },
  'click .remove': function(e,i) {
    var target = $(e.target);
    // console.log(target.attr('db-id'));
    CollectItems.remove({_id:target.attr('db-id')})
  },
  'dblclick .collect-item': function(e,i) {
    $('.file-manager').show();
    currentFile = {
      type: 'collectitem',
      id: $(e.target).attr("db-id"),
    };
  },
  'mousedown .move-obj': function(e,i) {
    e.preventDefault();
    moveTarget = $(e.target);
  },
  'mousedown .resize-width': function(e,i) {
    // console.log(e.target);
    e.preventDefault();
    moveTarget = $(e.target)
    console.log(e.target.clientWidth);
    var cross = getCurrentCrosshair();
    if(moveTarget.hasClass('gamegoal')) {
      startpos = {
        x: e.pageX,
        y: e.pageY,
        left: e.target.offsetLeft-cross.goal.width,
        top: e.target.offsetTop-cross.goal.height,
      };
    }
  },
  'mousedown .resize-height': function(e,i) {
    e.preventDefault();
    moveTarget = $(e.target)
    console.log(e.target.clientWidth);
    var cross = getCurrentCrosshair();
    if(moveTarget.hasClass('gamegoal')) {
      startpos = {
        x: e.pageX,
        y: e.pageY,
        left: e.target.offsetLeft-cross.goal.width,
        top: e.target.offsetTop-cross.goal.height,
      };
    }
  },
  'mousemove': function(e,i) {
    function toProzent(val) {
      return Math.round(val*100);
    }
    if(moveTarget!=null) {
      e.preventDefault();
      var prozent = {
        x: toProzent((e.pageX-10)/window.innerWidth),
        y: toProzent((e.pageY-10)/window.innerHeight),
      };
      if(moveTarget.hasClass('move-obj')) {

        // moveTarget.css('left',e.pageX-10);
        // moveTarget.css('top',e.pageY-10);
        if(moveTarget.hasClass('gamegoal')) {
          var cross = getCurrentCrosshair();
          var goal={
            width: cross.goal.width,
            height: cross.goal.height,
            x: prozent.x,
            y: prozent.y,
          };
          Crosshair.update({_id:cross._id},{$set:{goal}});
        }
      } else if(moveTarget.hasClass('resize-width')) {
        if(moveTarget.hasClass('gamegoal')) {
          var cross = getCurrentCrosshair();
          var goal={
            top: cross.goal.top,
            left: cross.goal.left,
            bottom: cross.goal.bottom,
            right: (e.pageX/window.innerWidth),
          };
          Crosshair.update({_id:cross._id},{$set:{goal}});
        }
      } else if(moveTarget.hasClass('resize-height')) {
        var cross = getCurrentCrosshair();
        var goal={
          top: cross.goal.top,
          left: cross.goal.left,
          bottom: (e.pageY/window.innerHeight),
          right: cross.goal.right,
        };
        Crosshair.update({_id:cross._id},{$set:{goal}});
      }
    }
  },
  'mouseup': function(e,i) {
    function toProzent(val) {
      return Math.round(val*100);
    }
    if(moveTarget!=null) {
      e.preventDefault();
      var prozent = {
        x: toProzent((e.pageX-10)/window.innerWidth),
        y: toProzent((e.pageY-10)/window.innerHeight),
      };
      console.log(moveTarget,prozent);
      if(moveTarget.hasClass('crosshair')) {
        var cross = getCurrentCrosshair();
        Crosshair.update({_id:cross._id},{$set:{x:prozent.x,y:prozent.y,}});
      } else if(moveTarget.hasClass('gamegoal')) {
        // var cross = getCurrentCrosshair();
        // var goal={
        //   width: cross.goal.width,
        //   height: cross.goal.height,
        //   x: prozent.x,
        //   y: prozent.y,
        // };
        // Crosshair.update({_id:cross._id},{$set:{goal}});
      } else if(moveTarget.hasClass('collect-item')) {
        CollectItems.update({_id:moveTarget.attr('db-id')},{$set:{
          x: prozent.x,
          y: prozent.y,
        }});
      }
      moveTarget=null;
    }
  },
});
Template.file_images.events({
  'click .file': function(e,i) {
    var image = Images.findOne({_id:this._id});
    $('.file-manager').hide();
    switch(currentFile.type) {
      case 'ch':
        Crosshair.update({_id:getCurrentCrosshair()._id},{$set:{url:image.url}});
        break;
      case 'bg':
        Games.update({_id:getCurrentGame()._id},{$set:{img:image.url}});
        break;
      case 'collectitem':
        // console.log("ci",currentFile);
        CollectItems.update({_id:currentFile.id},{$set:{img:image.url}})
        break;
    }
    currentFile=null;
  },
});
