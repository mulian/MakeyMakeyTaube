import {eventManager} from './event-manager.js'

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
