import './menu.html'

import {menu} from '../../../api/menu-controller.js';
import Games from "../../../../games.json";

//TODO: ingame!
import package from '../../../../package.json'
var map = package.keymap;

// import GlobalKeyBinder from '../../../api/keys/global-key-binder.js'
import {eventManager} from '../../../api/event-manager.js'
import {keymapManager} from '../../../api/keymap-manager.js';
keymapManager.bindAll('menu',[
  {key:'A', call: 'menu:left'},
  {key:'D', call: 'menu:right'},
  {key:' ', call: 'menu:enter'}
]);

Template.menu.onCreated(function() {
  //reset picSize on every recreate
  Session.set('picSize', null);
  keymapManager.currentTamplate = 'menu';
});
Template.menu.helpers({
  games: function() {
    //Call from View, get all Games
    return Games;
  }
});
Template.menu.rendered = function() {

  menu.id = 'menu_lu'; //to instanceiate Dom Vars only once
  //bind key's to Functions
  /*
  GlobalKeyBinder.bind([
    {
      key: keyMap[map].LEFT,
      call: MenuController.prev(),
    }, {
      key: keyMap[map].RIGHT,
      call: MenuController.next(),
    }, {
      key: keyMap[map].FIRE,
      call: MenuController._enter(),
    },
  ]);
  */
}
Template.menu.events({
  'click li': function(event, instance) {
    // On click, call enter
    MenuController.enter();
  }
});
