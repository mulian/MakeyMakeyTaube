import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../api/booth/db.js'
import {play} from './game-sounds.js'
import {message} from './game-massages.js'
//TODO: to api, also in check
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
function showGoal() {
  $('#gamegoal').addClass('green');
  // setTimeout(function() {
  //   $('#gamegoal').removeClass('show');
  // },2000);
}
function collectItems(crosshair) {
  var collectitems = Session.get('collectitems');
  var procentCrosshair = calcProcent($('#crosshair'));
  for(item of collectitems) {
    var procent = calcProcent($('*[db-id="'+item._id+'"]'));
    if(procentCrosshair.x==procent.x && procentCrosshair.y == procent.y) {
      collectitems = $.grep(collectitems,function(i) {
        return item._id!=i._id;
      });
      Session.set('collectitems',collectitems);
      play.soundOnCollect();
      if(collectitems.length==0) {
        showGoal();
        message.onlyGoal();
      }
      break;
    }
  }
}

Template.game.onRendered(function() {
  var collectitems = Session.get('collectitems');
  if(collectitems.length==0) {
    showGoal();
    message.onlyGoal();
  }
  Tracker.autorun(function() {
    collectItems(Session.get('crosshair'));
  });
});
