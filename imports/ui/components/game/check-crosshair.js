import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../api/booth/db.js'
import {play} from './game-sounds.js'
import {message} from './game-massages.js'
import {gotoMenu} from './game.js'

function calcProcent(div) {
  var pos = {
    x: div.offset().left + (div.width()/2),
    y: div.offset().top + (div.height()/2),
  };
  var procent = {
    x: Math.round(pos.x/innerWidth*100),
    y: Math.round(pos.y/innerHeight*100),
  }
  return procent;
}
function isInGoal() {
  var crosshairData = Session.get('crosshair');

  var procent = calcProcent($('#crosshair'));
  var collectitems = Session.get('collectitems');
  // console.log(crosshairData.goal.left<=procent.x && crosshairData.goal.right>=procent.x);
  if(collectitems.length==0) {
    if( (crosshairData.goal.left<=procent.x && (100-crosshairData.goal.right)>=procent.x) &&
        (crosshairData.goal.top<=procent.y && (100-crosshairData.goal.bottom)>=procent.y)
      ) {
      return true;
    } else {
      showGoal();
    }
  }
  return false;
}

//TODO: to api
function showGoal() {
  $('#gamegoal').addClass('show');
  setTimeout(function() {
    $('#gamegoal').removeClass('show');
  },2000);
}

var action = {
  'onGoal' : function() {
    // console.log("goal");
    gotoMenu(true);
  },
  'onNotGoal': function() {
    // console.log("not goal");
    // message.notWin();
  }
}

function onKeyPress(e) {
  if(e.keyCode==32) {
    e.preventDefault();
    if(isInGoal()) {
      action.onGoal();
    } else {
      if(Session.get('collectitems').length==0) {
        message.gotoGoal();
      } else {
        message.collectItems(Session.get('collectitems').length);
      }
    }
  }
}

Template.game.onRendered(function() {
  $('body').on('keypress',onKeyPress);
});
Template.game.onDestroyed(function() {
  $('body').unbind('keypress',onKeyPress);
});
