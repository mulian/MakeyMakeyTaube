import {getGames} from '../../api/games.js'
/*
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

Router.route('/', function() {
  // on Route / goto Template 'menu'
  getGames((games) => {
    this.render('menu');
  });
}, {
  name: 'menu' //currently no need?
});
Router.route('/game/:_gameID', function() {
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
