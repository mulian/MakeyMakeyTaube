import './menu.html'

import MenuController from '../../../api/menu-controller.js';
import Games from "../../../../games.json";

import keyMap from '../../../api/keys/key-map.js'
//TODO: ingame!
import package from '../../../../package.json'
var map = package.keymap;

// import GlobalKeyBinder from '../../../api/keys/global-key-binder.js'
import {keymapManager} from '../../../api/keymap-manager.js';
keymapManager.bindAll('menu',[
  {keyName:'LEFT', once:true, call:MenuController.prev()},
  {keyName:'RIGHT', once:true, call:MenuController.next()},
  {keyName:'FIRE', once:true, call: MenuController._enter()}
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
  MenuController.init(); //to instanceiate Dom Vars only once
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
