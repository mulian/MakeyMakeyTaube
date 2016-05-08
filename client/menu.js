module.exports = {
  init: function() {
    var _this = this;
    this.element = $('#menu_lu');
    this.aktivate($(this.element.children()[0]));
    this.element.children().hover(function(e) {
      _this.aktivate($(e.currentTarget));
    });
  },
  prev: function() {
    var _this = this;
    return function() {
      _this.aktivate(_this.selectedElement.prev());
    }
  },
  next: function() {
    var _this = this;
    return function() {
      _this.aktivate(_this.selectedElement.next());
    }
  },
  enter: function(callback) {
    var _this = this;
    return function() {
      _this.gotoGame(_this.selectedElement,callback);
    }
  },
  aktivate: function(element) {
    if(element.length==1) {
      //every selected element...
      if(this.selectedElement !=undefined) {
        this.selectedElement.removeClass('selected');
      }
      element.addClass('selected');
      this.selectedElement = element;
    }
  },
  gotoGame: function(element,callback) {
    // console.log(element);
    callback(element[0].children[0].href);
  }
}
