import './menu.html'
import '../../stylesheets/menu.less'
import '../../stylesheets/leaderboard.less'


import {getGames} from "../../../api/client/games.js";
import ViewClass from '../../../api/client/view-class.js'

var Games = null;
getGames(function(games) {
  Games = games;
});

// # Menu Class
class Menu extends ViewClass {
  constructor(id) {
    super('menu');
    this.id = id;
  }
  //select next item
  prev() {
    this.aktivate(this.selectedElement.prev());
  }
  //select prev item
  next() {
    this.aktivate(this.selectedElement.next());
  }
  // call enter of current item (goto game)
  enter() {
    var currentTarget = $(this.selectedElement[0]);
    Session.set('picSize', this.collectPicSize(currentTarget));
    var gameID = currentTarget.attr('gameid');
    Router.go('game', {_gameID: gameID});
  }
  // adds selectedet to new item and remove class from last
  aktivate(element=this.element) {
    if (element.length == 1) {
      //every selected element...
      if (this.selectedElement != undefined) {
        this.selectedElement.removeClass('selected');
      }
      element.addClass('selected');
      this.selectedElement = element;
    }
  }
  // get pic size of current selected item (for animation)
  collectPicSize(target) {
    var picSize = target.offset();
    picSize.width = target.width();
    picSize.height = target.height();
    return picSize;
  }

  // ## GETTER & SETTER
  //on this.id = 'xx' this will fire and defines first current item
  set id(val='menu_lu') {
    this.element = $(`#${val}`);
    this.aktivate($(this.element.children()[0]));
    this.element.children().hover((e) => {
      this.aktivate($(e.currentTarget));
    });
    this._id=val;
  }

  // ## ViewClass functions (more info in ViewClass)
  addEvents() {
    return [
      { name:'menu:left', call: ()=> this.prev() },
      { name:'menu:right', call: ()=> this.next() },
      { name:'menu:enter', call: ()=> this.enter() }
    ];
  }
  addKeys() {
    return [
      { key:'A', call: 'menu:left' },
      { key:'D', call: 'menu:right' },
      { key:' ', call: 'menu:enter' }
    ];
  }
}
//instanceiate a game for Meteor Template
var menu = new Menu();

// # Default Meteor Template functions

Template.menu.onCreated(function() {
  //reset picSize on every recreate
  Session.set('picSize', null);
});
Template.menu.helpers({
  games: function() {
    //Call from View, get all Games
    return Games;
  }
});
Template.menu.rendered = function() {

  menu.id = 'menu_lu'; //to instanceiate Dom Vars only once
}
Template.menu.events({
  'click li': function(event, instance) {
    // On click, call enter
    menu.enter();
  }
});
Template.menu.helpers({
  'player': function(){
    return Players.find({}, {sort:{time:1}})
  }
});
