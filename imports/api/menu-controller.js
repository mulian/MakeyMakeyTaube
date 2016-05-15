import {eventManager} from './event-manager.js'
var m=null;
export default class Menu {
  constructor(id) {
    this.id = id;
    this.initEvents();
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

  static create() {
    if(m==null) m = new Menu();
    return m;
  }
}

export let menu = Menu.create();

/*
module.exports = {
  init: function() {
    var _this = this;
    this.element = $('#menu_lu');
    this.aktivate($(this.element.children()[0]));
    this.element.children().hover(function(e) {
      _this.aktivate($(e.currentTarget));
    });
    this.initEvents();
  },
  initEvents() {
    eventManager.addAll([
      {name:'menu:left', call: ()=> this.prev()},
      {name:'menu:right', call: ()=> this.next()},
      {name:'menu:enter', call: ()=> this.enter()}
    ]);
  },
  prev: function() {
    this.aktivate(this.selectedElement.prev());
  },
  next: function() {
    this.aktivate(this.selectedElement.next());
  },
  enter: function() {
    // console.log($(this.selectedElement[0]).attr('gameid'));
    // Router.go('game',{_gameID:target.attr('gameid')});
    var currentTarget = $(this.selectedElement[0]);
    Session.set('picSize', this.collectPicSize(currentTarget));
    var gameID = currentTarget.attr('gameid');
    Router.go('game', {_gameID: gameID});
  },
  aktivate: function(element) {
    if (element.length == 1) {
      //every selected element...
      if (this.selectedElement != undefined) {
        this.selectedElement.removeClass('selected');
      }
      element.addClass('selected');
      this.selectedElement = element;
    }
  },
  collectPicSize: function(target) {
    var picSize = target.offset();
    picSize.width = target.width();
    picSize.height = target.height();
    return picSize;
  },
  withThis: function(func) {
    _this = this;
    return function() {
      func.apply(_this);
    }
  },
}
*/
