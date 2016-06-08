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

var gameTime = (1000*60*2);

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
    $('#background_img').removeClass('transform');
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
    var duration = this.instance.duration.get();
    var player = Players.find({}).count()+1;
    // console.log(players_count);
    Players.insert({
      name: player,
      game: this.controller.state.get('gameId'),
      milisecounds: (gameTime - duration.asMilliseconds()),
    });
    this.gotoMenu();
    notie.alert(1, "Getroffen! " + " Team " + player, 8)
    Session.set('lastPlayer',player);
  }
  //Called if goal is not reached
  goalNotReached() {
    // console.log(this.instance);
    // console.log(duration.asMilliseconds);
    crosshair.showGoal();
    notie.alert(3, "Nicht getroffen!", 3)
  }
  // Check if goal is reached
  check() {
    console.log("check");
    if (crosshair.isGoal()) {
      this.goalReached();
    } else {
      this.goalNotReached();
    }
  }

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
var game = new Game();
Template.game.onCreated( function() {
  this.game = game;
  this.game.controller = Iron.controller();
  this.game.instance = this;
  this.duration = new ReactiveVar(null);

});

// # Default Meteor Template functions

Template.game.onRendered(function() {
  // GlobalKeyBinder = Session.get('GlobalKeyBinder');
  // Define Dom Vars for Controller
  crosshair.init();
  var controller = Iron.controller();

  var picSize = Session.get('picSize');
  var img = $('#background_img');
  if (picSize != null) {
    img.css({
      width: picSize.width,
      height: picSize.height,
      left: picSize.left,
      top: picSize.top
    })

    Session.set('picSize', null); //no need, because of menu onCreate reset?
    setTimeout(() => {
      img.addClass('transform');
    }, 1);
  } else {
    img.addClass('transform');
  }

  //Timer
  this.endTime = moment().add(gameTime,'milliseconds');
  var timer = setInterval(() => {
    this.duration.set(moment.duration(moment(this.endTime).diff(new Date())))
    if(this.duration.get().seconds()<0) {
      clearInterval(timer);
      this.game.gotoMenu();
    }
  },1000);

  //Define currentGame from instance
  var currentGame = Games.findOne({id:controller.state.get('gameId')});
  crosshair.obj = currentGame.crosshair;

  //Only debbuger! to Find the right coords fog Goal
  if (package.debug)
    crosshair.debugCrosshairClick();
});
Template.game.helpers({
  game: function() {
    var controller = Iron.controller();
    return Games.findOne({id:controller.state.get('gameId')});
  },
  getTime: function() {
    var duration = Template.instance().duration.get();
    if(duration==null) return "0:00";
    else if(duration.seconds()<0) {
      //goto Menu? gotoMenu()
      return "0:00";
    }
    else {
      var sec = duration.seconds();
      if(sec<=9) sec = '0'+sec;
      return duration.minutes()+':'+sec;
    }
  }
});
