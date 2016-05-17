import './menu.html'

// import {menu} from '../../../api/menu-controller.js';
import Games from "../../../../games.json";

import {eventManager} from '../../../api/event-manager.js'
import {keymapManager} from '../../../api/keymap-manager.js';

import ViewClass from '../../../api/view-class.js'

class Menu extends ViewClass {
  constructor(id) {
    super('menu');
    this.id = id;
    // this.initEvents();
  }
  initEvents() {
    eventManager.addAll([
      {name:'menu:left', call: ()=> this.prev()},
      {name:'menu:right', call: ()=> this.next()},
      {name:'menu:enter', call: ()=> this.enter()}
    ]);
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

  addEvents() {
    return [
      {name:'menu:left', call: ()=> this.prev()},
      {name:'menu:right', call: ()=> this.next()},
      {name:'menu:enter', call: ()=> this.enter()}
    ];
  }
  addKeys() {
    return [
      {key:'A', call: 'menu:left'},
      {key:'D', call: 'menu:right'},
      {key:' ', call: 'menu:enter'}
    ];
  }
}

var menu = new Menu();



/*
keymapManager.bindAll('menu',[
  {key:'A', call: 'menu:left'},
  {key:'D', call: 'menu:right'},
  {key:' ', call: 'menu:enter'}
]);
*/

Template.menu.onCreated(function() {
  //reset picSize on every recreate
  Session.set('picSize', null);
  keymapManager.currentTamplate = 'menu';
});
Template.menu.helpers({
  games: function() {
    //Call from View, get all Games
    return Games;
  }
});
Template.menu.rendered = function() {

  menu.id = 'menu_lu'; //to instanceiate Dom Vars only once
  //bind key's to Functions
  /*
  GlobalKeyBinder.bind([
    {
      key: keyMap[map].LEFT,
      call: MenuController.prev(),
    }, {
      key: keyMap[map].RIGHT,
      call: MenuController.next(),
    }, {
      key: keyMap[map].FIRE,
      call: MenuController._enter(),
    },
  ]);
  */
}
Template.menu.events({
  'click li': function(event, instance) {
    // On click, call enter
    MenuController.enter();
  }
});
