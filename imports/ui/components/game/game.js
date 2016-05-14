import './game.html'
import GameController from '../../../api/game-controller.js';
import {crosshair} from '../../../api/crosshair.js';

import package from '../../../../package.json';

import {keymapManager} from '../../../api/keymap-manager.js';
import {eventManager} from '../../../api/event-manager.js'

keymapManager.bindAll('game',[
  {key:'W', call:'crosshair:up', multiKey:true},
  {key:'S', call:'crosshair:down', multiKey:true},
  {key:'A', call:'crosshair:left', multiKey:true},
  {key:'D', call:'crosshair:right', multiKey:true},
  {key:' ', call:'game:check'}
]);

eventManager.addAll([
  {name:'game:check', call: ()=> {
    console.log("game check");
    /*
    if (crosshair.isGoal()) {
      GameController.goalReached();
    } else {
      GameController.goalNotReached();
      crosshair.showGoal();
    }
    */
    }
  }
]);
Template.game.onCreated (function() {
  keymapManager.currentTamplate = 'game';
});

Template.game.rendered = function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
  // Define Dom Vars for Controller
  crosshair.init();
  GameController.init();
  //Define currentGame from instance
  var currentGame = Template.instance().data.currentGame;
  crosshair.obj = currentGame.crosshair;

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
