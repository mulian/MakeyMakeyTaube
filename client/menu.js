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
  enter: function() {
    var _this = this;
    return function() {
      _this.gotoGame(_this.selectedElement);
    }
  },
  aktivate: function(element) {
    if(element.length==1) {
      if(this.selectedElement !=undefined) {
        this.selectedElement.removeClass('selected');
      }
      element.addClass('selected');
      this.selectedElement = element;
    }
  },
  gotoGame: function(element) {
    // console.log(element);
    window.location.href = element[0].children[0].href;
  }
}
