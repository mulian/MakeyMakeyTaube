var Crosshair = {
  NONE: 0, LEFT: 11, RIGHT: 12, UP: 21, DOWN: 22, FIRE: 30,
  value: 20,
  init: function(crosshairInfo) {
    this.crosshairInfo = crosshairInfo;
    if (Meteor.isClient) {
      this.element = $("#crosshair");
      // this.bindKeys();
      this.setCrosshair();
      this.setImage();
      this.setWdith();
      this.show();
    }
  },
  setCrosshair: function(coord) {
    if (coord == undefined) {
      if(this.crosshairInfo!=undefined) coord = this.crosshairInfo.startpos;
      else { //set default if undefined
        coord = {
          x: 100,
          y: 100
        };
      }
    }
    this.x = coord.x; this.y = coord.y;
    if(this.x ==undefined || this.y == undefined) {
      console.log("Error no coord! Set Default.");
      this.x = 100; this.y = 100;
    }
    this.element.css('left', this.x);
    this.element.css('top', this.y);
  },
  setImage: function(url) {
    if(url==undefined) {
      if(this.crosshairInfo!=undefined) url = this.crosshairInfo.url;
      else {
        console.log("Error no Image! Set Default.");
        url = "/crosshair.png";
      }
    }
    this.element.attr("src", "../../" + url);
  },
  setWdith: function(width) {
    if(width==undefined) {
      if(this.crosshairInfo!=undefined) width = this.crosshairInfo.width;
      else {
        width=100;
      }
    }
    this.element.attr("width", width+"px");
  },
  show: function() {
    var _this = this;
    setTimeout(function() {
      _this.element.addClass("show");
    },1);
  },
  hide: function() {
    this.element.removeClass("show");
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
    if(gameGoal==undefined) {
      if(this.crosshairInfo!=undefined) gameGoal = this.crosshairInfo.goal;
      else {
        gameGoal = {
          x: 80,
          y: 80,
          diff: 10
        }
      }
    }
    var cX = this.x / (window.innerWidth / 100); //calc crosshair x in %
    var cY = this.y / (window.innerHeight / 100); //calc crosshair y in %
    if ((Math.abs(gameGoal.x - cX) < gameGoal.diff) && (Math.abs(gameGoal.y - cY) < gameGoal.diff)) {
      // console.log("GOAL!");
      return true;
    } else {
      return false;
    }

  },
  debugCrosshairClick: function() {
    $("body").click(function(e) {
      console.log(e);
      console.log("x: " + e.clientX / (window.innerWidth / 100) + "%");
      console.log("y: " + e.clientY / (window.innerHeight / 100) + "%");
    });
  },
  showGoal: function() {
    var gameGoal = this.crosshairInfo.goal;
    var goalElement = $("<div/>", {
      id: "gamegoal",
      text: "",
      css: {
        left: (gameGoal.x*(window.innerWidth/100))-(gameGoal.diff*(window.innerWidth/100)),
        top: (gameGoal.y*(window.innerHeight/100))-(gameGoal.diff*(window.innerHeight/100)),
        width: (gameGoal.diff*2*(window.innerWidth/100))+"px",
        height: (gameGoal.diff*2*(window.innerHeight/100))+"px",
        "background-color": "#FFF"
      }
    });
    $("body").append(goalElement);
    goalElement.addClass("showg");
    setTimeout(function() {
      goalElement.removeClass("showg");
      goalElement.remove();
    },1000);
  }
}

module.exports = Crosshair;
