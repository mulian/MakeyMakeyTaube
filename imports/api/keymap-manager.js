import EventManager from './event-manager.js'
eventManager = EventManager.create();

var km = null;
export default class KeymapManager {
  constructor() {
    this.intervalTime = 200;
    this.map = {};
    this.runninKeys = {};
    this.currentTamplate = null;
    document.body.addEventListener('keydown', (e) => {
      // console.log(String.fromCharCode(e.keyCode));
      this.down(e);
    });
    document.body.addEventListener('keyup', (e) => {
      this.up(e);
    });
  }
  bind(targetID,key,call) {
    if (this.map[targetID] == undefined) this.map[targetID]= {};
    this.map[targetID][key] = call;
  }
  bindAll(targetID,array) {
    for(item of array) {
      this.bind(targetID,item.key,item.call);
    }
  }
  down(e) {
    var k = String.fromCharCode(e.keyCode);
    console.log(this.map,this.map[this.currentTamplate][k]);
    if(this.map[this.currentTamplate][k]!=undefined && this.runninKeys[k]==undefined) {
      this.runninKeys[k] = setInterval(() => {
        eventManager.dispatch(this.map[this.currentTamplate][k]);
      },this.intervalTime);
    }
  }
  up(e) {
    var k = String.fromCharCode(e.keyCode);
    if(this.runninKeys[k]!=undefined) {
      clearInterval(this.runninKeys[k]);
      delete this.runninKeys[k];
    }
  }
  add(key,event) {
    this.map[key] = event;
  }
  static create() {
    if(km==null) km = new this();
    return km;
  }
}

export let keymapManager = KeymapManager.create();
