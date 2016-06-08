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

import {Games,Players} from '../../../api/booth/db.js'

// # Game Class
class Game extends ViewClass {
  constructor(controller) {
    // this.game =
    super('game');
    this.controller = controller;
    var current_stamp = new ReactiveVar();
  }
  // after DOM is ready
  init(gameId) {
    this.gameId = gameId;
    this.img = "background_img";
    this.setPicSize();
    crosshair.init();
    notie.alert(2, 'Ihr habt zwei Minuten Zeit!', 5);
    var time = new ReactiveVar();
    time = 119;
    setInterval(function() {
      if (time == 0) {
        notie.alert(3, "Zeit abgelaufen", 3);
        time--;
        setTimeout(function() {
          Router.go('/');
        }, 3000);
      } else if (time > 0) {
        if (time > 59) {
          var time_postfix = time-60;
          $('span#clock').html("1:" + time_postfix + "&nbsp;s");
        } else {
          $('span#clock').html("0:" + time + "&nbsp;s");
        }
        time--;
      }
    }, 1000);
  }
  getGameById(id) {
    return Games.findOne({id:this.controller.state.get('gameId')});
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

      Session.set('picSize', null); //no need, because of menu onCreate reset?
      setTimeout(() => {
        this.img.addClass('transform');
      }, 1);
    } else {
      this.img.addClass('transform');
    }
  }
  //Called if goal is reached
  goalReached() {
    var end = moment(new Date()).unix();
    var difference = end-current_stamp;
    var seconds = moment.duration(difference, 'milliseconds');
    seconds = seconds['_milliseconds'];
    var players_count = Players.find().count();
    var index = 0;
    if (players_count == 0) {
      var initialindex = 1;
      index = initialindex;
      Players.insert({
        name: "Team " + initialindex,
        game: this.gameId,
        time: seconds
      });
    } else {
      var nextindex = players_count+1;
      index = nextindex;
      Players.insert({
        name: "Team " + nextindex,
        game: this.gameId,
        time: seconds
      });
    }
    this.gotoMenu();
    notie.alert(1, "Getroffen! " + " Team " + index, 3)
  }
  //Called if goal is not reached
  goalNotReached() {
    notie.alert(3, "Nicht getroffen!", 3)
  }
  // Check if goal is reached
  check() {
    console.log("check");
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
      { key:'ARROW_UP', call:'crosshair:up', multiKey:true},
      { key:'ARROW_DOWN', call:'crosshair:down', multiKey:true},
      { key:'ARROW_LEFT', call:'crosshair:left', multiKey:true},
      { key:'ARROW_RIGHT', call:'crosshair:right', multiKey:true},
      { key:' ', call:'game:check'}
    ]
  }
}
// ## instanceiate a game for Meteor Template
var game = null;

Template.game.onCreated( function() {
  console.log("hier");
  this.game = new Game(Iron.controller());
  game = this.game;
});

// # Default Meteor Template functions

Template.game.rendered = function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
  // Define Dom Vars for Controller
  crosshair.init();
  var controller = Iron.controller();
  game.init(controller.state.get('gameId'));
  // get current time
  current_stamp = moment(new Date()).unix();

  //Define currentGame from instance
  var currentGame = Games.findOne({id:controller.state.get('gameId')});
  crosshair.obj = currentGame.crosshair;
  setTimeout(() => {
    $('#background_img').addClass('transform');
  },1);

  //Only debbuger! to Find the right coords fog Goal
  if (package.debug)
    crosshair.debugCrosshairClick();
}
Template.game.helpers({
  game: function() {
    //For Template, how needs background img url
    var controller = Iron.controller();
    return Games.findOne({id:controller.state.get('gameId')});
    // return game.getGameById(Template.instance().data.currentGame);
  }
});
