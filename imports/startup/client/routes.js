import {getGames} from '../../api/client/games.js'
import {Players,Configurations} from '../../api/booth/db.js'
// ## import UI Components
import '../../ui/components/game/game.js'
import '../../ui/components/menu/menu.js'
import '../../ui/components/loading/loading.js'
import '../../ui/components/editor/editor.js'

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
Router.route('/editor',{
  subscriptions: function() {
    this.subscribe('default_db_config').wait();
    this.subscribe('default_db_games').wait();
    this.subscribe('default_db_players').wait();
    this.subscribe('default_db_CollectItems').wait();
    this.subscribe('default_db_sounds').wait();
    this.subscribe('default_db_images').wait();

  },
  action: function() {
    if(this.ready()) this.render('editor');
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
  },
  action: function() {
    this.state.set('gameId',this.params._gameID);
    if(this.ready()) this.render('game');
    else this.render('loading');
  }
});
// Router.route('/', function() {
//   // on Route / goto Template 'menu'
//   getGames((games) => {
//     this.render('main');
//   });
// }, {
//   name: 'main' //currently no need?
// });
// ## Route from /games/xxx
// Router.route('/game/:_gameID', function() {
//   //on route /game/:var, var is in this.params
//   getGames((games) => {
//     this.render('game', {
//       data: {
//         //set current game Data to template instance.data
//         //TODO: ohne GameController lösen
//         currentGame: this.params._gameID
//       }
//     });
//   });
// }, {
//   name: 'game' //gamename for better use Route.go
// });


/*
//https://github.com/iron-meteor/iron-router/blob/devel/examples/waiton/waiton.js
//http://www.manuel-schoebel.com/blog/meteorjs-iron-router-filters-before-and-after-hooks
Router.onBeforeAction(function(pause) {
  this.next();
});
Router.map(function() {
  this.route('/', {
    getGames((games) => {
      this.render('menu');
    });
  }, {
    name: 'menu' //currently no need?
  });
  this.route('/game/:_gameID', function() {
    //on route /game/:var, var is in this.params
    getGames((games) => {
      this.render('game', {
        data: {
          //set current game Data to template instance.data
          //TODO: ohne GameController lösen
          currentGame: this.params._gameID
        }
      });
    });
  }, {
    name: 'game' //gamename for better use Route.go
  });
});
*/
