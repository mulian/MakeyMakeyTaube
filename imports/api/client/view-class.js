import {eventManager} from './event-manager.js'; //get current EvenetManager instance
import {keymapManager} from './keymap-manager.js'; //get current KeymapManager instance

/*
  ViewClass is a simple Class to define easyli the event- and keymap-Manager
*/
export default
class ViewClass {
  constructor(templateName,keyTemplate=true) {
    this.templateName = templateName;
    // if false, child class is not a keyTemplate (no need to call keymapManager on created)
    this.keyTemplate = keyTemplate;

    this.initFunctions();
  }
  initFunctions() {
    // call addEvents from Child Class if defined and add it to eventManager
    if(this.addEvents!=undefined) eventManager.addAll( this.addEvents() ); //return obj!
    // call addKeys from Child Class if defined and add it to keymapManager
    if(this.addKeys!=undefined) keymapManager.bindAll(this.templateName, this.addKeys() ); //return obj!
    // Set current template for keymapManager
    if(this.keyTemplate) {
      Template[this.templateName].onCreated (() => {
        keymapManager.currentTamplate = this.templateName;
      });
    }
  }
}
