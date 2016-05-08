module.exports = {
  binds: {},
  init: function() {
    var _this = this;
    $('body').on('keydown', function(event) {
      _this.fire(event,_this);
    });
  },
  bind: function(keyCode,callback) {
    this.binds[keyCode] = callback;
  },
  fire: function(event,_this) {
    var keyCode = event.keyCode;
    if(_this.binds[keyCode]!=undefined) {
      _this.binds[keyCode]();
      event.preventDefault();
    }
  }
}
