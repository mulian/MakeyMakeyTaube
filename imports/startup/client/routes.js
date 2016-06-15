import {getGames} from '../../api/client/games.js'
import {Players,Configurations} from '../../api/booth/db.js'
// ## import UI Components
import '../../ui/components/game/game.js'
import '../../ui/components/menu/menu.js'
import '../../ui/components/loading/loading.js'
import '../../ui/components/editor/editor.js'
import '../../ui/components/editor/game/editor-game.js'

import '../../ui/components/login/login.js'
import './accounts-config.js'

// # Routes

// ## Route from /
Router.route('/',{
  subscriptions: function() {
    this.subscribe('default_db_config').wait();
    this.subscribe('default_db_games').wait();
    this.subscribe('default_db_players').wait();
    this.subscribe('default_db_images').wait();

  },
  action: function() {
    if(this.ready()) this.render('main');
    else this.render('loading');
  }
});

Router.route('/game/:_gameID',{
  name: 'game',
  subscriptions: function() {
    this.subscribe('default_db_config').wait();
    this.subscribe('default_db_games').wait();
    this.subscribe('default_db_players').wait();
    this.subscribe('default_db_CollectItems').wait();
    this.subscribe('default_db_images').wait();
    this.subscribe('default_db_sounds').wait();
    this.subscribe('default_db_crosshair').wait();
  },
  action: function() {
    this.state.set('gameId',this.params._gameID);
    if(this.ready()) this.render('game');
    else this.render('loading');
  }
});
Router.route('/editor/:_gameID?',{
  name: 'editor',
  subscriptions: function() {
    this.subscribe('default_db_config').wait();
    this.subscribe('default_db_games').wait();
    this.subscribe('default_db_players').wait();
    this.subscribe('default_db_CollectItems').wait();
    this.subscribe('default_db_sounds').wait();
    this.subscribe('default_db_images').wait();
    this.subscribe('default_db_crosshair').wait();
  },
  onBeforeAction: function() {
    if (!Meteor.user()) {
    // render the login template but keep the url in the browser the same
      this.render('app_login');
    } else this.next();
  },
  action: function() {
    // console.log(this.params._gameID);
    if(this.ready())
      if(this.params._gameID==undefined) this.render('editor');
      else {
        this.state.set('gameId',this.params._gameID);
        this.render('editor_game');
      }
    else this.render('loading');
  }
});
