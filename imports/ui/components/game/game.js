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

//Countdown
import 'jquery-countdown/dist/jquery.countdown.min.js';

// # Game Class
class Game extends ViewClass {
  constructor() {
    super('game');
    getGames((Games) => {
      this.games = Games;
    });
    var current_stamp = new ReactiveVar();
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
    // TODO: get last inserted player, count index +1 up
    var end = moment(new Date()).unix();
    var difference = end-current_stamp;
    var seconds = moment.duration(difference, 'milliseconds');
    seconds = seconds['_milliseconds'];
    var players_count = Players.find().count();
    if (players_count == 0) {
      var initialindex = 1;
      Players.insert({
        name: "Team " + initialindex,
        time: seconds
      });
    } else {
      var nextindex = players_count+1;
      Players.insert({
        name: "Team " + nextindex,
        time: seconds
      });
    }
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
  // get current time
  current_stamp = moment(new Date()).unix();

  // todo: countdown is not visible
  var sixty_seconds = new Date().getTime() + 60000;
  $('#clock').countdown(sixty_seconds, {elapse: true})
  //$('#clock').countdown('2016/05/24 19:15:00')
      .on('update.countdown', function(event) {
        var $this = $(this);
        if (event.elapsed) {
          notie.alert(3, "Zeit überschritten", 5);
          location.reload();
        } else {

        }
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
