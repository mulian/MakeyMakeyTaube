import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../../api/booth/db.js'

var move = null;
Template.editor_game.events({
  'mousedown #gamegoal.move-obj': function(e,i) {
    e.preventDefault();
    move = {
      goal : this.goal,
      crosshair: this,
      class: 'gamegoal',
      diff: {
        x: 100-(this.goal.left+this.goal.right),
        y: 100-(this.goal.top+this.goal.bottom),
      },
    };
  },
  'mousedown #crosshair.move-obj': function(e,i) {
    e.preventDefault();
    move = {
      goal : this.goal,
      crosshair: this,
      class: 'crosshair',
    };
  },
  'mousedown .collect-item.move-obj': function(e,i) {
    e.preventDefault();
    move = {
      goal : this.goal,
      collectitem: this,
      class: 'collectitem',
    };
  },
  'mousemove': function(e,i) {
    if(move!=null) {
      e.preventDefault();
      var procent = {
        x : (Math.round((e.clientX/innerWidth)*100)),
        y : (Math.round((e.clientY/innerHeight)*100)),
      }
      if(move.class=='gamegoal') {
        move.goal.top = procent.y-2;
        move.goal.left = procent.x-2;
        move.goal.bottom = 100-(move.goal.top + move.diff.y);
        move.goal.right = 100-(move.goal.left + move.diff.x);
        Crosshair.update({_id:move.crosshair._id},{$set:{goal:move.goal}});
      } else if(move.class=='crosshair') {
        // console.log(e.clientX,e.clientY);
        Crosshair.update({_id:move.crosshair._id},{$set:{x:(procent.x-2),y:(procent.y-2)}});
      } else if(move.class=='collectitem') {
        CollectItems.update({_id:move.collectitem._id},{$set:{x:(procent.x-2),y:(procent.y-2)}});
      }
    }
  },
  'mouseup': function(e,i) {
    if(move!=null) {
      e.preventDefault();
      move=null;
    }
  },
});
