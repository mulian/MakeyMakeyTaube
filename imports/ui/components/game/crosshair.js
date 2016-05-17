// import {eventManager} from '../../../api/event-manager.js'
import ViewClass from '../../../api/view-class.js'

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
var gameGoalTime = 1; //show in secounds

let ch =null;

export default
class Crosshair extends ViewClass {
  constructor(id) {
    super('game',false);
    this.init(id);
    this._setAttr();
  }
  _setAttr() {
    this.NONE= 0; this.LEFT= 11; this.RIGHT= 12; this.UP= 21; this.DOWN= 22; this.FIRE= 30;
    this.value= 1;
  }
  init(id,gameGoalId) {
    this.id = id;
    this.gameGoal = gameGoalId;
  }
  //TODO: REMOVE css...
  _move(direction) {
    // console.log("move?",direction);
    if (direction == undefined)
      direction = this.NONE;
    // if (direction == 0) {
      // this.element.css('left', this.x);
      // this.element.css('top', this.y);
    // } else
    if (direction < 20) { //left/right
      if (direction == this.LEFT)
        this.x -= this.value;
      if (direction == this.RIGHT)
        this.x += this.value;
      if (this.x < 0) {
        this.x = 0;
      } else if ((this.x + this.value) > window.innerWidth) {
        this.x -= this.value;
      }
      // else {
        // this.element.css('left', this.x);
      // }
    } else if (direction >= 20) { //UP/DOWN
      if (direction == this.UP)
        this.y -= this.value;
      if (direction == this.DOWN)
        this.y += this.value;
      if (this.y < 0) {
        this.y = 0;
      } else if ((this.y + this.value) > window.innerHeight) {
        this.y -= this.value;
      }
      // else {
        // this.element.css('top', this.y);
      // }
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
    var cX = this.x+((this.element.width()/window.innerWidth)*50); //calc crosshair x in %
    var cY = this.y+((this.element.height()/window.innerHeight)*50); //calc crosshair y in %
    if (
      (cX>=(gameGoal.x-gameGoal.diff) && (cX<=(gameGoal.x+gameGoal.diff))) &&
      (cY>=(gameGoal.y-gameGoal.diff) && (cY<=(gameGoal.y+gameGoal.diff)))
    ) {
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
    this.gameGoal.addClass("show");
    if(this.goalTimeout!=undefined) clearTimeout(this.goalTimeout);
    this.goalTimeout = setTimeout(() => {
      this.gameGoal.removeClass("show");
    },gameGoalTime*1000);
  }

  //SETTER & GETTER
  set obj(obj=def) {
    var {url,width,startpos,goal} = obj;
    // this.url = url;
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
  set gameGoal(id='gamegoal') {
    this._gameGoal = $(`#${id}`);
    this._gameGoalId = id;
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
      this.x= pos.x;
      this.y= pos.y;
    }
  }
  set x(val) {
    this.element.css('left', val+'%');
    this._x=val;
  }
  set y(val) {
    // console.log(this.element.css());
    this.element.css('top', val+'%');
    this._y=val;
  }
  set goal(goal={x: 91,y: 52,diff: 8}) {
    this._goal= goal;
    this.gameGoal.css({
      left: (goal.x-goal.diff)+'%',
      top: (goal.y-goal.diff)+'%',
      width: (goal.diff*2)+"%",
      height: (goal.diff*2)+"%"
    });
  }
  get gameGoal() {return this._gameGoal; }
  get x() { return this._x; }
  get y() { return this._y; }
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

  //Viewclass methodes
  addEvents() {
    return [
      {name:'crosshair:left',call: ()=> this._move(this.LEFT)},
      {name:'crosshair:right',call:  ()=> this._move(this.RIGHT)},
      {name:'crosshair:up',call:  ()=> this._move(this.UP)},
      {name:'crosshair:down',call: ()=> this._move(this.DOWN)}
    ];
  }
}

export let crosshair = Crosshair.create();
