import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import './main.html';

import GlobalKeyBinder from './global-key-binder.js'
import keyMap from './key-map.js'
import package from '../package.json'
var map = package.keymap;

// Crosshair
// Should the CrosshairController part of GameController and not of main?
import CrosshairController from './crosshair-controller.js';

//Template Controller
import MenuController from './menu-controller.js';
import GameController from './game-controller.js';
import Games from "./games.json";

// BODY
Template.body.rendered = function() {
  GlobalKeyBinder.init();
}

// MENU
Router.route('/', function() {
  // on Route / goto Template 'menu'
  this.render('menu');
}, {
  name: 'menu' //currently no need?
});
Template.menu.onCreated(function() {
  //reset picSize on every recreate
  Session.set('picSize', null);
});
Template.menu.helpers({
  games: function() {
    //Call from View, get all Games
    return Games;
  }
});
Template.menu.rendered = function() {
  MenuController.init(); //to instanceiate Dom Vars only once
  //bind key's to Functions
  GlobalKeyBinder.bind([
    {
      key: keyMap[map].LEFT,
      call: MenuController.prev(),
    }, {
      key: keyMap[map].RIGHT,
      call: MenuController.next(),
    }, {
      key: keyMap[map].FIRE,
      call: MenuController._enter(),
    },
  ]);
}
Template.menu.events({
  'click li': function(event, instance) {
    // On click, call enter
    MenuController.enter();
  }
});

// GAME
Router.route('/game/:_gameID', function() {
  //on route /game/:var, var is in this.params
  this.render('game', {
    data: {
      //set current game Data to template instance.data
      currentGame: GameController.getGameById(this.params._gameID)
    }
  });
}, {
  name: 'game' //gamename for better use Route.go
});
Template.game.rendered = function() {
  // Define Dom Vars for Controller
  GameController.init();
  //Define currentGame from instance
  var currentGame = Template.instance().data.currentGame;
  CrosshairController.init(currentGame.crosshair);
  //redefine Global Keys to Functions
  GlobalKeyBinder.bind([
    {
      key: keyMap[map].UP,
      call: CrosshairController.moveThis(CrosshairController.UP),
    }, {
      key: keyMap[map].DOWN,
      call: CrosshairController.moveThis(CrosshairController.DOWN),
    }, {
      key: keyMap[map].LEFT,
      call: CrosshairController.moveThis(CrosshairController.LEFT),
    }, {
      key: keyMap[map].RIGHT,
      call: CrosshairController.moveThis(CrosshairController.RIGHT),
    }, {
      key: keyMap[map].FIRE,
      call: function() {
        console.log("FIRE!");
        if (CrosshairController.isGoal()) {
          GameController.goalReached();
        } else {
          GameController.goalNotReached();
          CrosshairController.showGoal();
        }
      },
    },
  ]);

  //Only debbuger! to Find the right coords fog Goal
  if (package.debug)
    CrosshairController.debugCrosshairClick();
  }
Template.game.helpers({
  game: function() {
    //For Template, how needs background img url
    return Template.instance().data.currentGame;
  }
});
