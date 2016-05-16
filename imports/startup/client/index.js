import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
// import '../../ui/components/main.html';
import './routes.js'

// import GlobalKeyBinder from '../../api/keys/global-key-binder.js'
import keyMap from '../../api/keys/key-map.js'
import package from '../../../package.json'
import Games from "../../../games.json";
var map = package.keymap;
// Crosshair
// Should the CrosshairController part of GameController and not of main?

//Template Controller
import MenuController from '../../api/menu-controller.js';

import '../../ui/stylesheets/main.css'

import Game from '../../ui/components/game/game.js'
import Menu from '../../ui/components/menu/menu.js'
