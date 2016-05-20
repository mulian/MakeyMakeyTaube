// instance of KeymapManager
var EM=null;
// # EventManager Class
export default class EventManager {
  constructor() {
    this.eventMap = {};
  }
  // ## Add/Remove Events
  // add one event
  add(name,call) {
    this.eventMap[name] = call;
    window.addEventListener(name,call);
  }
  // add all events in array
  addAll(array) {
    for(item of array) {
      this.add(item.name,item.call);
    }
  }
  // remove (one) event
  remove(name) {
    delete this.eventMap[name];
    window.removeEventListener(name);
  }
  // ## Dispatch Events
  // Fires events
  dispatch(name,obj) {
    var event = new CustomEvent(name, {detail:obj});
    // console.log('dispatch: '+name);
    window.dispatchEvent(event);
  }
  // ## Creates instance
  // creates only one instance of this Class
  static create() {
    if(EM==null) EM = new this();
    return EM;
  }
}
// creates only one instance of this Class
export let eventManager = EventManager.create();
