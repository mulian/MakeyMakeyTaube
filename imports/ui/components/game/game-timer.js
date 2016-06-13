import {Games,Players,CollectItems,Sounds,Config} from '../../../api/booth/db.js'
import {currentGame,gotoMenu} from './game.js'
import {message} from './game-massages.js'
var once = true;
export var insertPlayers = function(gameId) {
  if(once) {
    var player = Players.find({}).count()+1;
    Players.insert({
      name: player,
      game: gameId,
      milisecounds: (gameTime*1000) - duration.get().asMilliseconds(),
    });
    Session.set('lastPlayer',player);
    once=false;
    return player;
  }
}

var gameTime = (60*2); //fallback
var duration = null;
var config = null;
Template.game.onCreated(function() {
  once = true;
  this.duration = new ReactiveVar(null);
  duration = this.duration;
  config = Config.findOne({});
  gameTime = ((config.gameMin*60)+config.gameSec);
});
Template.game.helpers({
  getTime: function() {
    var duration = Template.instance().duration.get();
    if(duration==null) return "0:00";
    else if(duration.seconds()<0) {
      //goto Menu? gotoMenu()
      return "0:00";
    }
    else {
      var sec = duration.seconds();
      if(sec<=9) sec = '0'+sec;
      return duration.minutes()+':'+sec;
    }
  }
});
var timer = null;
function countdown(duration,endTime) {
  duration.set(moment.duration(moment(endTime).diff(new Date())))
  if(duration.get().asSeconds()==10) $('.countdown').addClass('hot');
  if(duration.get().asSeconds()<=0) {
    gotoMenu(false);
  }
}
Template.game.onRendered(function() {
  //Timer
  var sec = null, min = null;
  if(currentGame.timeMin!=undefined && currentGame.timeSec!=undefined) {
    gameTime = (parseInt(currentGame.timeMin)*60)+parseInt(currentGame.timeSec);
    sec = currentGame.timeSec; min = currentGame.timeMin;
  } else {
    sec = config.gameSec; min = config.gameMin;
  }
  setTimeout(() => {
    $('#gamegoal').addClass('show');
    this.endTime = moment().add(gameTime+1,'seconds');
    message.timeless(min,sec);
    $('#los').addClass('hide');
    countdown(this.duration,this.endTime);
    timer = setInterval(() => {
      countdown(this.duration,this.endTime);
    },1000);
  },0.5*1000);

});
Template.game.onDestroyed(function() {
  clearInterval(timer);
});
