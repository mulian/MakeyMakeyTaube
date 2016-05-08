import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';


import globalKeyBinder from './global-key-binder.js'
import keyMap from './key-map.js'
var map = "AWSD";

//Notie
import notie from 'notie';
import 'notie/dist/notie.css';

import Menu from './menu.js'

var games = [
  {
    id:'base',
    name:"Baseball",
    img:"baseball.jpg",
    crosshair:"baseball_crosshair.png",
    goal: { //Procent!
      x: 91,
      y: 47
    }
  },
  {id:'frog',name:"Frog",img:"frog.jpg"},
  {id:'fire',name:"Feuer",img:"fire.jpg"},
  {id:'sun',name:"Sonne",img:"sun.jpg"},
  {id:'softball',name:"Softball",img:"softball.jpg"}
]
var getGameById = function(id) {
  for(var i=0;i<games.length;i++) {
    if(games[i].id==id) {
      return games[i];
    }
  }
}
var isGameMode = false;
var changeGame = function(gameId) {

  isGameMode=true;
}
var game=null;
//Routing
Router.route('/', function () {
  this.render('menu');
});
Router.route('/game/:_gameID', function () {
  game = this.params._gameID;
  this.render('game');
});

// Crosshair
import crosshair from './crosshair.js'

// BODY
Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});
Template.body.events({
  'keydown a': function(event) {
    console.log("KEY!");
  }
});
Template.body.helpers({
  "gameMode": function() {
    return isGameMode;
  }
});

// GAME
var goalReached = function() {
  Router.go('/');
  notie.alert(1,"Gewonnen!",2)
}
var goalNotReached = function() {
  notie.alert(3,"Verloren!",2)
}
Template.game.onCreated(function () {
  var g = getGameById(game);
  // console.log(games[game].img);
  $("body").css('background-image','url(../../'+g.img+')');
});
Template.game.rendered = function() {
  var g = getGameById(game);
  crosshair.init(goalReached,goalNotReached);
  globalKeyBinder.bind(keyMap[map].UP,crosshair.moveThis(crosshair.UP));
  globalKeyBinder.bind(keyMap[map].DOWN,crosshair.moveThis(crosshair.DOWN));
  globalKeyBinder.bind(keyMap[map].LEFT,crosshair.moveThis(crosshair.LEFT));
  globalKeyBinder.bind(keyMap[map].RIGHT,crosshair.moveThis(crosshair.RIGHT));
  globalKeyBinder.bind(keyMap[map].FIRE,function() {
    console.log("FIRE!");
    crosshair.isGoal(g.goal);
  });
  globalKeyBinder.init();

  crosshair.image(g.crosshair);

  $("body").css("background-size",window.innerWidth+"px "+window.innerHeight+"px");
  $("body").css("height",window.innerHeight+"px");
  $("body").css("width",window.innerWidth+"px");
  $(window).resize(function() {
    $("body").css("background-size",window.innerWidth+"px "+window.innerHeight+"px");
    $("body").css("height",window.innerHeight+"px");
    $("body").css("width",window.innerWidth+"px");
  });

  crosshair.debugCrosshairClick();
}

// MENU
var callEnter= function(url) {
  Router.go(url);
}

Template.menu.onCreated(function helloOnCreated() {
  console.log("Hello! from menu");
  $("body").css('background-image',"");
});
Template.menu.helpers({
  'games':function() {
    return games;
  }
});
Template.menu.rendered = function() {
  console.log("BIND MENU");
  Menu.init();
  globalKeyBinder.bind(keyMap[map].LEFT,Menu.prev());
  globalKeyBinder.bind(keyMap[map].RIGHT,Menu.next());
  globalKeyBinder.bind(keyMap[map].FIRE,Menu.enter(callEnter));
  globalKeyBinder.init();
}

//
// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
//   asd() {
//     return Template.instance().asd.get();
//   }
// });
//
// Template.hello.events({
//   'click #1'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
//   'click #2'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() - 1);
//   },
// });
