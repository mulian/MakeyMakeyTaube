import {eventManager} from './event-manager.js'

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

export default class Crosshair {
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
    console.log("Crosshair._regEvents");
    eventManager.addAll([
      {name:'crosshair:left',call: ()=> this._move(this.LEFT)},
      {name:'crosshair:right',call:  ()=> this._move(this.RIGHT)},
      {name:'crosshair:up',call:  ()=> this._move(this.UP)},
      {name:'crosshair:down',call: ()=> this._move(this.DOWN)}
    ]);
  }
  //TODO: REMOVE css...
  _move(direction) {
    console.log("move?",direction);
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
    console.log("set?");
    $(document).ready(() => {
      console.log("set?!");
      this.element = $(`#${id}`);
      console.log(this.element);
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
      console.log("setpos!",this.element);
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
