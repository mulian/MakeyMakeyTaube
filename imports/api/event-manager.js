class EventManager {
  constructor() {
    this.eventMap = {};
  }
  add(name,call) {
    this.eventMap[name] = call;
    window.addEventListener(name,call);
    this.printfEventList();
  }
  addAll(array) {
    for(item of array) {
      this.add(item.name,item.call);
    }
  }
  remove(name) {
    delete this.eventMap[name];
    window.removeEventListener(name);
  }
  dispatch(name,obj) {
    var event = new CustomEvent(name, {detail:obj});
    window.dispatchEvent(event);
  }
  printfEventList() {
    console.log(this.eventMap);
  }
}

var EM = null;
if(EM == null) {
  EM = new EventManager();
}

export default EM;
