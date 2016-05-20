import CollectGames from '../../api/server/collect-games.js'
import { Meteor } from 'meteor/meteor';

var gameCollection = new CollectGames();

// # Meteor Methodes
Meteor.methods({
  // define getGames
  getGames: function() {
    return gameCollection.games;
  }
});
