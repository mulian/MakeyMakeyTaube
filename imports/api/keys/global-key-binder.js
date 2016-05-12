module.exports = {
  binds: {},
  init: function() {
    var _this = this;
    console.log("init");
    $('body').on('keydown', function(event) {
      _this.fire(event, _this);
    });
  },
  bind: function(keyCode, callback) {
    if (keyCode instanceof Array) { //on Array
      for (var key in keyCode) {
        var obj = keyCode[key];
        this.bind(obj.key, obj.call);
      }
    } else
      this.binds[keyCode] = callback; // normal add
    }
  ,
  fire: function(event, _this) {
    var keyCode = event.keyCode;
    if (_this.binds[keyCode] != undefined) {
      _this.binds[keyCode]();
      event.preventDefault();
    }
  },
}
