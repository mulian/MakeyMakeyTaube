import './game.html'
import '../../stylesheets/game.less'
import {crosshair} from './crosshair.js';
import ViewClass from '../../../api/view-class.js'
//Notie
import notie from 'notie';
import 'notie/dist/notie.css';

import package from '../../../../package.json';
// import Games from "../../../../games.json";
import {getGames} from "../../../api/games.js";

class Game extends ViewClass {
  constructor() {
    super('game');
  }
  init() {
    this.img = "background_img";
    this.setPicSize();
    crosshair.init();
  }
  getGameById(id) {
    var Games = getGames();
    for (var i = 0; i < Games.length; i++) {
      if (Games[i].id == id) {
        return Games[i];
      }
    }
  }
  gotoMenu() {
    this.img.removeClass('transform');
    setTimeout(function() {
      Router.go('/');
    }, 500);
  }
  setPicSize() {
    var picSize = Session.get('picSize');
    if (picSize != null) {
      this.img.css({
        width: picSize.width,
        height: picSize.height,
        left: picSize.left,
        top: picSize.top
      })

      Session.set('picSize', null); //no need, becaus of menu onCreate reset?
      setTimeout(() => {
        this.img.addClass('transform');
      }, 1);
    } else {
      this.img.addClass('transform');
    }
  }
  goalReached() {
    this.gotoMenu();
    notie.alert(1, "Gewonnen!", 2)
  }
  goalNotReached() {
    notie.alert(3, "Falsch!", 1)
  }
  check() {
    if (crosshair.isGoal()) {
      this.goalReached();
    } else {
      this.goalNotReached();
      crosshair.showGoal();
    }
  }

  //GETTER & SETTER
  set img(val= 'background_img') {
    this._img = $(`#${val}`);
  }

  get img() { return this._img; }

  // ViewClass functions
  addEvents() {
    return [
      { name:'game:check', call: ()=> this.check() }
    ]
  }
  addKeys() {
    return [
      { key:'W', call:'crosshair:up', multiKey:true},
      { key:'S', call:'crosshair:down', multiKey:true},
      { key:'A', call:'crosshair:left', multiKey:true},
      { key:'D', call:'crosshair:right', multiKey:true},
      { key:' ', call:'game:check'}
    ]
  }
}
var game = new Game();

Template.game.rendered = function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
  // Define Dom Vars for Controller
  crosshair.init();
  game.init();
  //Define currentGame from instance
  var currentGame = game.getGameById(Template.instance().data.currentGame);
  crosshair.obj = currentGame.crosshair;

  //Only debbuger! to Find the right coords fog Goal
  if (package.debug)
    crosshair.debugCrosshairClick();
}
Template.game.helpers({
  game: function() {
    //For Template, how needs background img url
    return game.getGameById(Template.instance().data.currentGame);
  }
});
