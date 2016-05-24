import './game.html'
import '../../stylesheets/game.less'
import {crosshair} from './crosshair.js';
import ViewClass from '../../../api/client/view-class.js'

import package from '../../../../package.json';

//to get Server Informations
import {getGames} from "../../../api/client/games.js";

//Notie
import notie from 'notie';
import 'notie/dist/notie.css';

// # Game Class
class Game extends ViewClass {
  constructor() {
    super('game');
    getGames((Games) => {
      this.games = Games;
    });
  }
  // after DOM is ready
  init() {
    this.img = "background_img";
    this.setPicSize();
    crosshair.init();
  }
  getGameById(id) {
    var Games = this.games;
    for (var i = 0; i < Games.length; i++) {
      if (Games[i].id == id) {
        return Games[i];
      }
    }
  }
  //Go to Menu, with animation
  gotoMenu() {
    this.img.removeClass('transform');
    setTimeout(function() {
      Router.go('/');
    }, 500);
  }
  //Animation on from Menu to Game (if set)
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
  //Called if goal is reached
  goalReached() {
    Players.insert({
      name: "Test",
      time: 1
    });
    this.gotoMenu();
    notie.alert(1, "Gewonnen!", 2)
  }
  //Called if goal is not reached
  goalNotReached() {
    notie.alert(3, "Falsch!", 1)
  }
  // Check if goal is reached
  check() {
    if (crosshair.isGoal()) {
      this.goalReached();
    } else {
      this.goalNotReached();
      crosshair.showGoal();
    }
  }

  // ## GETTER & SETTER
  //will called everytime on this.img = 'xxx'
  set img(val= 'background_img') {
    this._img = $(`#${val}`);
  }
  //will called everytime on return this.img
  get img() { return this._img; }

  // ## ViewClass functions (more info in ViewClass)
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
// ## instanceiate a game for Meteor Template
var game = new Game();

// # Default Meteor Template functions

Template.game.rendered = function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
  // Define Dom Vars for Controller
  crosshair.init();
  game.init();
  $('#clock').countdown('2016/05/24 19:15:00')
      .on('update.countdown', function(event) {
        var format = '%H:%M:%S';
        if (event.offset.days > 0) {
          format = '%-d day%!d ' + format;
        }
        if (event.offset.weeks > 0) {
          format = '%-w week%!w ' + format;
        }
        $(this).html(event.strftime(format));
      })
      .on('finish.countdown', function(event) {
        $(this).html('Zeit überschritten! Spiel wird neu gestartet!');
        location.reload();
      });

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
