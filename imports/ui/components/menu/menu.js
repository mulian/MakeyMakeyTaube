import './menu.html'
import '../../stylesheets/menu.less'
import '../../stylesheets/leaderboard.less'


import {getGames} from "../../../api/client/games.js";
import ViewClass from '../../../api/client/view-class.js'

import {Games,Players} from '../../../api/booth/db.js'


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
    // console.log(this.selectedElement.find('.gameItem'));
    // var currentTarget = $(this.selectedElement[0]).children('li').children('div');
    var currentTarget = this.selectedElement.find('.gameItem');
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
      { key:'ARROW_LEFT', call: 'menu:left' , multiKey:true },
      { key:'ARROW_RIGHT', call: 'menu:right', multiKey:true },
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
    // return Games;
    return Games.find({});
  }
});
Template.menu.rendered = function() {
  Meteor.call('resetColectItems');
  menu.id = 'menu_lu'; //to instanceiate Dom Vars only once
}
Template.menu.events({
  'click li': function(event, instance) {
    // On click, call enter
    menu.enter();
  }
});
function addZero(number) {
  if(number<=9) return '0'+number;
  else return number;
}
Template.menu_game.helpers({
  players: function(){
    // console.log(this);
    return Players.find({game: this.id}, {
      limit:10,
      sort:{milisecounds:1},
      transform: function(item) {
        var duration = moment.duration(item.milisecounds);
        item.time = addZero(duration.minutes())+':'+
          addZero(duration.seconds())+':'+
            addZero(duration.milliseconds());
        // console.log(item.milisecounds);
        // console.log(item.time);
        if(Session.get('lastPlayer')==item.name) {
          // console.log("this team");
          item.highlight = 'highlight';
        }
        return item;
      }
    });
  }
})
