import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
// import '../../ui/components/main.html';
import './routes.js'

// import GlobalKeyBinder from '../../api/keys/global-key-binder.js'
import keyMap from '../../api/keys/key-map.js'
import package from '../../../package.json'
import Games from "../../../games.json";
var map = package.keymap;
// Crosshair
// Should the CrosshairController part of GameController and not of main?

//Template Controller
import MenuController from '../../api/menu-controller.js';
import GameController from '../../api/game-controller.js';

import '../../ui/stylesheets/main.css'

import Game from '../../ui/components/game/game.js'
import Menu from '../../ui/components/menu/menu.js'

// BODY
Template.body.rendered = function() {
  // GlobalKeyBinder.init();
  // Session.set("GlobalKeyBinder",GlobalKeyBinder);
}

// MENU
/*
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
*/

// GAME
/*
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
*/
