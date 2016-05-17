var EM=null;
export default class EventManager {
  constructor() {
    this.eventMap = {};
  }
  add(name,call) {
    this.eventMap[name] = call;
    window.addEventListener(name,call);
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
    // console.log('dispatch: '+name);
    window.dispatchEvent(event);
  }
  static create() {
    if(EM==null) EM = new this();
    return EM;
  }
}
export let eventManager = EventManager.create();
