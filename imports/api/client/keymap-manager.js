import {eventManager} from './event-manager.js'; //get current EvenetManager instance

var km = null; // instance of KeymapManager
// # KeymapManager Class
export default
class KeymapManager {
  constructor() {
    this.intervalTime = 100;
    this.multiKeyMap = {};
    this.keyMap = {};
    this.runninKeys = {};
    this.currentTamplate = null;
    this.regEvents();
  }
  // ## RegEvents
  // reg DOM eventlistener to cach key pres/up/down
  regEvents() {
    document.body.addEventListener('keydown', (e) => {
      this.down(e);
    });
    document.body.addEventListener('keyup', (e) => {
      this.up(e);
    });
    document.body.addEventListener('keypress', (e) => {
      this.press(e);
    });
  }
  // ## Bind
  // bind to targetID a key and a triggered call (if key is pressed)
  bind(targetID,key,call,multikey = false) {
    if(multikey) {
      if (this.multiKeyMap[targetID] == undefined) this.multiKeyMap[targetID]= {};
      this.multiKeyMap[targetID][key] = call;
    } else {
      if (this.keyMap[targetID] == undefined) this.keyMap[targetID] = {};
      this.keyMap[targetID][key] = call;
    }
  }
  // binds all keys in array with this.bind
  bindAll(targetID,array) {
    for(item of array) {
      this.bind(targetID,item.key,item.call,item.multiKey);
    }
  }
  // ## Handle key press
  //normal Key press
  press(e) {
    var key = String.fromCharCode(e.keyCode);
    var targetMap = this.keyMap[this.currentTamplate];
    if(targetMap!=undefined) {
      var call = targetMap[key.toUpperCase()];
      if(call!=undefined) {
        e.preventDefault();
        eventManager.dispatch(call);
      }
    }
  }

  //For multiply key press (games)
  down(e) {
    var k = String.fromCharCode(e.keyCode);
    var targetMap = this.multiKeyMap[this.currentTamplate];
    if(targetMap!=undefined) {
      if(targetMap[k]!=undefined && this.runninKeys[k]==undefined) {
        e.preventDefault();
        eventManager.dispatch(targetMap[k]);
        this.runninKeys[k] = setInterval(() => {
          eventManager.dispatch(targetMap[k]);
        },this.intervalTime);
      }
    }
  }
  //For multiply key press (games)
  up(e) {
    var k = String.fromCharCode(e.keyCode);
    if(this.runninKeys[k]!=undefined) {
      e.preventDefault();
      clearInterval(this.runninKeys[k]);
      delete this.runninKeys[k];
    }
  }
  // ## Creates instance
  // creates only one instance of this Class
  static create() {
    if(km==null) km = new this();
    return km;
  }
}

// creates only one instance of this Class
export let keymapManager = KeymapManager.create();
