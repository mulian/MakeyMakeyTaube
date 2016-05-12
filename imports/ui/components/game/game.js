import './game.html'
import GameController from '../../../api/game-controller.js';
import CrosshairController from '../../../api/crosshair-controller.js';
import keyMap from '../../../api/keys/key-map.js'
//TODO: ingame!
import package from '../../../../package.json'
var map = package.keymap;

import GlobalKeyBinder from '../../../api/keys/global-key-binder.js'

Template.game.rendered = function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
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
