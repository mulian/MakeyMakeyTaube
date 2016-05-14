import './game.html'
import GameController from '../../../api/game-controller.js';
import CrosshairController from '../../../api/crosshair-controller.js';

import package from '../../../../package.json'

import GlobalKeyBinder from '../../../api/keys/global-key-binder.js'

GlobalKeyBinder.bindAll('game',[
  {keyName:'UP', call:CrosshairController.moveThis(CrosshairController.UP)},
  {keyName:'DOWN', call:CrosshairController.moveThis(CrosshairController.DOWN)},
  {keyName:'LEFT', call:CrosshairController.moveThis(CrosshairController.LEFT)},
  {keyName:'RIGHT', call:CrosshairController.moveThis(CrosshairController.RIGHT)},
  {keyName:'FIRE', once:true,call: function() {
      if (CrosshairController.isGoal()) {
        GameController.goalReached();
      } else {
        GameController.goalNotReached();
        CrosshairController.showGoal();
      }
    }
  }
]);

Template.game.onCreated (function() {
  GlobalKeyBinder.currentTamplate = 'game';
});

Template.game.rendered = function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
  // Define Dom Vars for Controller
  GameController.init();
  //Define currentGame from instance
  var currentGame = Template.instance().data.currentGame;
  CrosshairController.init(currentGame.crosshair);
  //redefine Global Keys to Functions
  /*
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
  */

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
