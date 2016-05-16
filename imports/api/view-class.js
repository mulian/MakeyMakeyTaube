import {eventManager} from './event-manager.js'
import {keymapManager} from './keymap-manager.js';

export default
class ViewClass {
  constructor(templateName,keyTemplate=true) {
    this.templateName = templateName;
    this.keyTemplate = keyTemplate;
    this.initTemplateFunctions();
    this.initOtherFunctions();
  }
  initOtherFunctions() {
    if(this.addEvents!=undefined) eventManager.addAll( this.addEvents() ); //return obj
    if(this.addKeys!=undefined) keymapManager.bindAll(this.templateName, this.addKeys() ); //return obj
  }
  initTemplateFunctions() { //no need because of this value
    if(this.rendered!=undefined) Template[this.templateName].rendered = this.rendered;
    if(this.onCreated!=undefined) Template[this.templateName].onCreated( this.onCreated );
    if(this.helpers!=undefined) Template[this.templateName].helpers( this.helpers() ); //return obj
    if(this.events!=undefined) Template[this.templateName].events( this.events() ); //return obj

    if(this.keyTemplate)
      Template[this.templateName].onCreated (function() {
        keymapManager.currentTamplate = 'game';
      });
  }
}
