import {eventManager} from '../../../api/event-manager.js'

var def = {
  "url": "baseball_crosshair.png",
  "width": 50,
  "startpos": {
    "x": 200,
    "y": 100
  },
  "goal": {
      "x": 91,
      "y": 52,
      "diff": 8
  }
}

let ch =null;

export default
class Crosshair {
  constructor(id) {
    this.init(id);
    this._setAttr();
    this._regEvents();
  }
  _setAttr() {
    this.NONE= 0; this.LEFT= 11; this.RIGHT= 12; this.UP= 21; this.DOWN= 22; this.FIRE= 30;
    this.value= 20;
  }
  init(id) {
    this.id = id;
  }
  _regEvents() {
    // console.log("Crosshair._regEvents");
    eventManager.addAll([
      {name:'crosshair:left',call: ()=> this._move(this.LEFT)},
      {name:'crosshair:right',call:  ()=> this._move(this.RIGHT)},
      {name:'crosshair:up',call:  ()=> this._move(this.UP)},
      {name:'crosshair:down',call: ()=> this._move(this.DOWN)}
    ]);
  }
  //TODO: REMOVE css...
  _move(direction) {
    // console.log("move?",direction);
    if (direction == undefined)
      direction = this.NONE;
    if (direction == 0) {
      this.element.css('left', this.x);
      this.element.css('top', this.y);
    } else if (direction < 20) { //left/right
      if (direction == this.LEFT)
        this.x -= this.value;
      if (direction == this.RIGHT)
        this.x += this.value;
      if (this.x < 0) {
        this.x = 0;
      } else if ((this.x + this.value) > window.innerWidth) {
        this.x -= this.value;
      } else {
        this.element.css('left', this.x);
      }
    } else if (direction >= 20) { //UP/DOWN
      if (direction == this.UP)
        this.y -= this.value;
      if (direction == this.DOWN)
        this.y += this.value;
      if (this.y < 0) {
        this.y = 0;
      } else if ((this.y + this.value) > window.innerHeight) {
        this.y -= this.value;
      } else {
        this.element.css('top', this.y);
      }
    }
  }

  isGoal(gameGoal= this.goal) {
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
  }
  debugCrosshairClick() {
    $("body").click(function(e) {
      console.log(e);
      console.log("x: " + e.clientX / (window.innerWidth / 100) + "%");
      console.log("y: " + e.clientY / (window.innerHeight / 100) + "%");
    });
  }
  showGoal() {
    var gameGoal = this.goal;
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

  //SETTER & GETTER
  set obj(obj=def) {
    var {url,width,startpos,goal} = obj;
    this.url = url;
    this.width = width;
    this.startpos = startpos;
    this.goal = goal;
    this._obj = obj;
  }
  set id(id='crosshair') {
    $(document).ready(() => {
      this.element = $(`#${id}`);
      // console.log(this.element);
      setTimeout(() => {
        this.element.addClass('show')
      }, 1);
    });
    this._id = id;
  }
  set url(url = 'crosshair.png') {
    if(this.element!=undefined) this.element.attr("src", `/${url}`);
    this._url= url;
  }
  set width(width = 50) {
    if(this.element!=undefined) this.element.css('width',`${width}px`);
    this._width= width;
  }
  set startpos(pos={x: 100,y: 200}) {
    this._pos= pos;  //no need?
    this.currentPos = pos;
  }
  set currentPos(pos) {
    if(this.element!=undefined) {
      // console.log("setpos!",this.element);
      this.x= pos.x;
      this.y= pos.y;
    }
  }
  set x(val) {
    this.element.css('left', val);
    this._x=val;
  }
  set y(val) {
    this.element.css('top', val);
    this._y=val;
  }
  set goal(goal={x: 91,y: 52,diff: 8}) { this._goal= goal; }
  get x() { return this._x}
  get y() { return this._y}
  get id() { return this._id; }
  get obj() { return this._obj; }
  get url() { return this._url; }
  get width() { return this._width; }
  get pos() { return this._pos; }
  get goal() { return this._goal; }
  static create() {
    if(ch==null) ch = new this();
    return ch;
  }
}

export let crosshair = Crosshair.create();
