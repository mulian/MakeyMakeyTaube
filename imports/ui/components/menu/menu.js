import './menu.html'
import './menu.less'
import {Games,Players,Config} from '../../../api/booth/db.js'

import './menu-navigation.js'
import './menu-game-scores.js'

Template.menu.helpers({
  games: function() {
    //Call from View, get all Games
    return Games.find({},{sort:{order:1}});
  }
});
