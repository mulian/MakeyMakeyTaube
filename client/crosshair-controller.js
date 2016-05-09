var Crosshair = {
  NONE: 0, LEFT: 11, RIGHT: 12, UP: 21, DOWN: 22, FIRE: 30,
  x: 100,
  y: 100,
  value: 20,
  init: function() {
    if (Meteor.isClient) {
      this.element = $("#crosshair");
      // this.bindKeys();
      this.move();
    }
  },
  show: function() {
    this.element.show();
  },
  hide: function() {
    this.element.hide();
  },
  image: function(url) {
    this.element.attr("src", "../../" + url);
  },
  debugCrosshairClick: function() {
    $("body").click(function(e) {
      console.log(e);
      console.log("x: " + e.clientX / (window.innerWidth / 100) + "%");
      console.log("y: " + e.clientY / (window.innerHeight / 100) + "%");
    });
  },
  move: function(direction, _this) {
    if (_this == undefined)
      _this = this;
    if (direction == undefined)
      direction = _this.NONE;
    if (direction == 0) {
      _this.element.css('left', _this.x);
      _this.element.css('top', _this.y);
    } else if (direction < 20) { //left/right
      if (direction == _this.LEFT)
        _this.x -= _this.value;
      if (direction == _this.RIGHT)
        _this.x += _this.value;
      if (_this.x < 0) {
        _this.x = 0;
      } else if ((_this.x + _this.value) > window.innerWidth) {
        _this.x -= _this.value;
      } else {
        _this.element.css('left', _this.x);
      }
    } else if (direction > 20) { //UP/DOWN
      if (direction == _this.UP)
        _this.y -= _this.value;
      if (direction == _this.DOWN)
        _this.y += _this.value;
      if (_this.y < 0) {
        _this.y = 0;
      } else if ((_this.y + _this.value) > window.innerHeight) {
        _this.y -= _this.value;
      } else {
        _this.element.css('top', _this.y);
      }
    }
  },
  moveThis: function(direction) {
    var _this = this;
    return function() {
      _this.move(direction, _this);
    }
  },
  isGoal: function(gameGoal) {
    var diff = 10;
    var cX = this.x / (window.innerWidth / 100);
    var cY = this.y / (window.innerHeight / 100);
    // console.log("cX: "+cX);
    // console.log("cY: "+cY);
    // if(
    if ((Math.abs(gameGoal.x - cX) < diff) && (Math.abs(gameGoal.y - cY) < diff)) {
      console.log("GOAL!");
      return true;
    } else {
      return false;
    }

  },
}

module.exports = Crosshair;
