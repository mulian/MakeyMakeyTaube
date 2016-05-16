import eventManager from '../../api/event-manager.js'

//TODO: no need?
/*
eventManager.addAll([
  {name:'router:menu', call: undefined},
  {name:'router:game', call: undefined}
]);
*/

Router.route('/', function() {
  // on Route / goto Template 'menu'
  this.render('menu');
}, {
  name: 'menu' //currently no need?
});
Router.route('/game/:_gameID', function() {
  //on route /game/:var, var is in this.params
  this.render('game', {
    data: {
      //set current game Data to template instance.data
      //TODO: ohne GameController lösen
      currentGame: this.params._gameID
    }
  });
}, {
  name: 'game' //gamename for better use Route.go
});
