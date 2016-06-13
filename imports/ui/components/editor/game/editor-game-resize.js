import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../../api/booth/db.js'

var resize = null;
Template.editor_game.events({
  'mousedown .resize-width.gamegoal': function(e,i) {
    e.preventDefault();
    resize = {
      target: $(e.target),
      goal: Crosshair.findOne({_id:this._id}).goal,
      id: this._id,
      width: true,
      class: 'gamegoal',
    }
  },
  'mousedown .resize-height.gamegoal': function(e,i) {
    e.preventDefault();
    resize = {
      target: $(e.target),
      goal: Crosshair.findOne({_id:this._id}).goal,
      id: this._id,
      width: false,
      class: 'gamegoal',
    }
  },
  'mousedown .crosshair.resize-width': function(e,i) {
    e.preventDefault();
    resize = {
      target: $(e.target),
      crosshair: this,
      left: $(e.target).offset().left - this.width,
      class: 'crosshair',
    }
  },
  'mousedown .collect-item.resize-width': function(e,i) {
    e.preventDefault();
    resize = {
      target: $(e.target),
      collectitem: this,
      left: $(e.target).offset().left - this.width,
      class: 'collectitem',
    }
  },
  'mousemove': function(e,i) {
    if(resize !=null) {
      e.preventDefault();
      var procent = {
        right : (100-Math.round((e.clientX/innerWidth)*100)),
        bottom : (100-Math.round((e.clientY/innerHeight)*100)),
      }
      if(resize.class=='gamegoal') {
        if(resize.width) {
          resize.goal.right = procent.right;
          if((resize.goal.right+resize.goal.left)>=99) resize.goal.right=99-resize.goal.left;
        } else {
          resize.goal.bottom = procent.bottom;
          if((resize.goal.top+resize.goal.bottom)>=99) resize.goal.bottom=99-resize.goal.top;
        }
        Crosshair.update({_id:resize.id},{$set:{goal:resize.goal}});
      } else if(resize.class=='crosshair') {
        var thisWidth = e.clientX - resize.left;
        if(thisWidth<10) thisWidth=10;
        Crosshair.update({_id:resize.crosshair._id},{$set:{width:thisWidth}});
      } else if(resize.class=='collectitem') {
        var thisWidth = e.clientX - resize.left;
        if(thisWidth<10) thisWidth=10;
        // console.log(thisWidth);
        CollectItems.update({_id:resize.collectitem._id},{$set:{width:thisWidth}});
      };
    }
  },
  'mouseup': function(e,i) {
    if(resize !=null) {
      e.preventDefault();
      resize = null;
    }
  },
});
