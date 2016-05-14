import KeyMap from './key-map.js'

class GlobalKeyBinder {
  defineAttributes() {
    this.keyMap = {
      AWSD: {
        UP: 87, DOWN: 83, LEFT: 65, RIGHT: 68, FIRE: 32
      },
      ARROWS: {
        UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, FIRE: 32
      }
    };
    this.currentKeyMap = 'AWSD';
    this.currentTamplate = null;
    this.binds = {};
    this.currentFire = {};
  }
  constructor() {
    let GKB = this;
    console.log("HELLO!1");
    this.defineAttributes();
    // $(document).ready(() => {
    //   this.init();
    // });
    this.init();
  }
  init() {
    // console.log("HELLO!2");
    document.body.addEventListener('keydown', (e) => {
      // console.log(String.fromCharCode(e.keyCode));
      console.log(keyboardMap[e.keyCode]);
      this.down(e);
    })
    document.body.addEventListener('keyup', (event) => {
      this.up(event);
    })
    // $('body').on('keyup',(e) => {
    //    var value = this.value + String.fromCharCode(e.keyCode);
    //    console.log(value);
    // });
  }
  once(event) {
    var call = this.binds[this.currentTamplate].once[event.keyCode];
    console.log(event.keyCode,this.binds[this.currentTamplate]);
    if(call!=undefined) {
      console.log("once");
      call();
    }
  }
  down(event) {
    var call = this.binds[this.currentTamplate][event.keyCode];
    this.once(event);
    if(call!=undefined) {
      if(this.currentFire[event.keyCode]==undefined) {
        call();
        this.currentFire[event.keyCode]=setInterval(function() {
          call();
        },100);
      }
    }
  }
  up(event) {
    clearInterval(this.currentFire[event.keyCode]);
    delete this.currentFire[event.keyCode];
  }
  bind(template,keyName,call,once = false) {
    if(this.binds[template] == undefined) this.binds[template] = {};
    var key = this.keyMap[this.currentKeyMap][keyName];
    if(key==undefined) {
      console.log("error bind");
      return 0;
    }
    if (once) {
      if(this.binds[template].once==undefined) this.binds[template].once = {};
      this.binds[template].once[key] = call;
    } else {
      this.binds[template][key] = call;
      // console.log(this.binds);
    }
  }
  bindAll(template,obj) {
    for(var item of obj) {
      var once = item.once;
      if (once==undefined) once=false;
      this.bind(template,item.keyName,item.call,once);
    }
  }
}
var GKB = null;
if(GKB == null) {
  GKB = new GlobalKeyBinder();
}

export default GKB;
