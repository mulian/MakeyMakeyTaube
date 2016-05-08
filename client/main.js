import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

// Notie
// import notie from 'notie';
// import 'notie/dist/notie.css';

var games = [{id:'base',name:"Baseball",img:"baseball.jpg"},{id:'frog',name:"Frog",img:"frog.jpg"}];
var isGameMode=false;
var changeGame = function(gameId) {

  isGameMode=true;
  console.log(Template.instance());
}

//Routing
Router.route('/', function () {
  this.render('menu');
});
Router.route('/game/:_gameID', function () {
  console.log(this.params._gameID);
  this.render('game');
});

// Crosshair
import crosshair from './crosshair.js'

Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.body.rendered = function() {
  crosshair.init(true);
}
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

// MENU
Template.menu.onCreated(function helloOnCreated() {
  console.log("Hello! from menu");
});
Template.menu.helpers({
  'games':function() {
    return games;
  }
});
Template.menu.events({
  'click li': function(event) {
    console.log("CLICK");
    console.log(event.target);
    changeGame();
  }
});

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
