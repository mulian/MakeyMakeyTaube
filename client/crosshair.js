var Crosshair = {
  NONE: 0, LEFT: 11, RIGHT: 12, UP: 21, DOWN: 22,
  x: 100, y: 100,
  value: 40,
  KEYS: {
    AWSD: {
      UP: 87, DOWN: 83, LEFT: 65, RIGHT: 68, FIRE: 32
    }
  },
  init: function(show) {
    if(show==undefined) show=true;
    if(Meteor.isClient) {
      this.element = $("#crosshair");
      if(!show) this.hide();
      this.bindKeys();
      this.move();
    }
  },
  bindKeys: function(keys) {
    var _this = this;
    if(keys==undefined) keys="AWSD";
    $('body').on('keypress', function(event) {
      switch(event.keyCode) {
        case _this.KEYS[keys].FIRE:
          notie.alert(1, 'FIRE!',2);
          event.preventDefault();
          break;
        case _this.KEYS[keys].LEFT:
          _this.move(_this.LEFT);
          event.preventDefault();
          break;
        case _this.KEYS[keys].RIGHT:
          _this.move(_this.RIGHT);
          event.preventDefault();
          break;
        case _this.KEYS[keys].UP:
          _this.move(_this.UP);
          event.preventDefault();
          break;
        case _this.KEYS[keys].DOWN:
          _this.move(_this.DOWN);

          break;
      }
    });
  },
  show: function() {
    this.element.show();
  },
  hide: function() {
    console.log(this.element);
    this.element.hide();
  },
  move: function(direction) {
    if(direction == undefined) direction = this.NONE;
    if(direction == 0) {
      this.element.css('left',this.x);
      this.element.css('top',this.y);
    } else if(direction < 20) { //left/right
      if(direction == this.LEFT) this.x -= this.value;
      if(direction == this.RIGHT) this.x += this.value;
      if(this.x < 0) {
        this.x = 0;
      } else if ((this.x + this.value) > window.innerWidth) {
        this.x -= this.value;
      } else {
        this.element.css('left',this.x);
      }
    } else if(direction > 20) { //UP/DOWN
      if(direction == this.UP) this.y -= this.value;
      if(direction == this.DOWN) this.y += this.value;
      if(this.y < 0) {
        this.y = 0;
      } else if ((this.y + this.value) > window.innerHeight) {
        this.y -= this.value;
      } else {
        this.element.css('top',this.y);
      }
    }
  }
}

module.exports = Crosshair;
