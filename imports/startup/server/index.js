import CollectGames from './collect-games.js'
import { Meteor } from 'meteor/meteor';

var gameCollection = new CollectGames();

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    resetShoots: function() {
        Shoots.remove({});
    },
    getGames: function() {
      return gameCollection.games;
    }
});
