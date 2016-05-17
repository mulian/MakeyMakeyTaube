import './menu.html'
import '../../stylesheets/menu.less'

import {getGames} from "../../../api/games.js";
import ViewClass from '../../../api/view-class.js'

class Menu extends ViewClass {
  constructor(id) {
    super('menu');
    this.id = id;
  }
  prev() {
    this.aktivate(this.selectedElement.prev());
  }
  next() {
    this.aktivate(this.selectedElement.next());
  }
  enter() {
    // console.log($(this.selectedElement[0]).attr('gameid'));
    // Router.go('game',{_gameID:target.attr('gameid')});
    var currentTarget = $(this.selectedElement[0]);
    Session.set('picSize', this.collectPicSize(currentTarget));
    var gameID = currentTarget.attr('gameid');
    Router.go('game', {_gameID: gameID});
  }
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
  collectPicSize(target) {
    var picSize = target.offset();
    picSize.width = target.width();
    picSize.height = target.height();
    return picSize;
  }

  set id(val='menu_lu') {
    this.element = $(`#${val}`);
    this.aktivate($(this.element.children()[0]));
    this.element.children().hover((e) => {
      this.aktivate($(e.currentTarget));
    });
    this._id=val;
  }

  // ViewClass functions
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
var menu = new Menu();

Template.menu.onCreated(function() {
  //reset picSize on every recreate
  Session.set('picSize', null);
});
Template.menu.helpers({
  games: function() {
    //Call from View, get all Games
    return getGames();
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
