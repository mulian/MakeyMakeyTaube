import ViewClass from '../../../api/client/view-class.js'

import {Games,Players,CollectItems} from '../../../api/booth/db.js'
// # Set Default Values

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

var gameGoalTime = 1; //show Goal in secounds
let ch =null;

// var items = [
//   {
//     x: 90,
//     y: 90,
//     diff: 8,
//     width: 100,
//     img: '/public/korb/crosshair.png',
//   }
// ];

// # Crosshair Class
export default //to get this Class default on import
class Crosshair extends ViewClass {
  // called on new Crosshair(id)
  constructor(id) {
    super('game',false);
    this.init(id);
    this._setAttr();
    // this.collectItems = items;
    // this.createCollectItems();
  }
  // Private
  // Init class Attributes
  _setAttr() {
    this.NONE= 0; this.LEFT= 11; this.RIGHT= 12; this.UP= 21; this.DOWN= 22; this.FIRE= 30;
    this.value= 1;
  }
  // call after DOM is ready
  init(id,gameGoalId) {
    this.id = id;
    this.gameGoal = gameGoalId;
    this.collectItems = this.getCollectItems();
  }

  getCollectItems() {
    return CollectItems.find({game:this.id});
  }

  checkCollected() {
    // console.log(this.x,this.y,this.gameId);
    var reachedItem = CollectItems.findOne({game:this.gameId,x:this.x,y:this.y,ready:undefined});
    // console.log(reachedItem);
    if(reachedItem!=undefined) {
      Meteor.call('sound_ready');
      CollectItems.update({_id:reachedItem._id},{$set:{ready:true}});
    }
  }

  // createCollectItems() {
  //   for(item of this.collectItems) {
  //     var item = $("<img>", {
  //       src: item.img,
  //       class: 'collectItem',
  //       css: {
  //         left: item.x + "%",
  //         top: item.y + "%",
  //         width: item.width + "px",
  //       }
  //     });
  //     $('body').append(item);
  //   }
  // }
  // call move direction
  // the set x function (below) set the css left/top position
  _move(direction) {
    // console.log("move?",direction);
    if (direction == undefined)
      direction = this.NONE;
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
    }
  }
  // check if crosshair is in goal
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
  // Show goal
  showGoal() {
    this.gameGoal.addClass("show");
    if(this.goalTimeout!=undefined) clearTimeout(this.goalTimeout);
    this.goalTimeout = setTimeout(() => {
      this.gameGoal.removeClass("show");
    },gameGoalTime*1000);
  }
  // on package.debuge it will show you the current x/y pos of pics
  debugCrosshairClick() {
    $("body").click(function(e) {
      console.log(e);
      console.log("x: " + e.clientX / (window.innerWidth / 100) + "%");
      console.log("y: " + e.clientY / (window.innerHeight / 100) + "%");
    });
  }

  // ## SETTER & GETTER
  set obj(obj=def) {
    var {url,width,startpos,goal} = obj;
    this.width = width;
    this.startpos = startpos;
    this.goal = goal;
    this._obj = obj;
  }
  set id(id='crosshair') {
    $(document).ready(() => {
      this.element = $(`#${id}`);
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
    this.checkCollected();
  }
  set y(val) {
    this.element.css('top', val+'%');
    this._y=val;
    this.checkCollected();
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

  // return only one (maby already created) instance of this Class
  static create() {
    if(ch==null) ch = new this();
    return ch;
  }

  // ## ViewClass functions (more info in ViewClass)
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
