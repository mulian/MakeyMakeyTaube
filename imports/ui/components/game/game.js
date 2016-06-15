import './game.html'
import './game.less'
import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../api/booth/db.js'

import {out} from './game-in-out-ani.js'
import './move-crosshair.js'
import './check-crosshair.js'
import './collect-items.js'
import {play} from './game-sounds.js'
import {insertPlayers} from './game-timer.js'
import {message} from './game-massages.js'

var config = null;

export var gotoMenu = function(win=true) {
  $('#background_img').removeClass('transform');
  if(win) {
    play.soundOnWin();
    message.win(insertPlayers(currentGame._id));
  }
  else {
    message.notWin();
    play.soundOnLose();
  }
  out(function() {
    Router.go('/');
  });
}
export var currentGame= null;
Template.game.onCreated(function() {
  currentGame = Games.findOne({path:Iron.controller().state.get('gameId')});
  config = Config.findOne({});
  Session.set('crosshair',
    Crosshair.findOne({
      _id: Games.findOne({path:Iron.controller().state.get('gameId')}).crosshair,
    })
  );
  Session.set('collectitems',
    CollectItems.find({
      game: Games.findOne({path:Iron.controller().state.get('gameId')})._id,
    }).fetch()
  );
});
Template.game.helpers({
  game: function() {
    // console.log(Games.findOne({path:Iron.controller().state.get('gameId')}));
    return Games.findOne({path:Iron.controller().state.get('gameId')});
  },
  crosshair: function() {
    return Session.get('crosshair');
  },
  getCollectItems: function() {
    // return CollectItems.find({game:this._id});
    return Session.get('collectitems');
  },
});
Template.game.onRendered(function() {
  setTimeout(() => {
    $('.fadein').addClass('fade');
  },200);
});
