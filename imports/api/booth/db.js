import GameClass from './Games.js'
export const Players = new Mongo.Collection('players');
export const Configurations = new Mongo.Collection('configurations');
export const Games = new GameClass();
export const CollectItems = new Mongo.Collection('collectitems');
export const Sounds = new Mongo.Collection('sounds');

if(Meteor.isServer) {
  Meteor.publish('default_db_players', function(){
    return Players.find({});
  });
  Meteor.publish('default_db_config', function(){
    return Configurations.find({});
  });
  Meteor.publish('default_db_games', function(){
    return Games.find({});
  });
  Meteor.publish('default_db_CollectItems', function(){
    return CollectItems.find({});
  });
  Meteor.publish('default_db_sounds', function(){
    return Sounds.find({});
  });

  Meteor.methods({
    resetColectItems: function(gameId) {
      if(gameId==undefined) {
        CollectItems.update({},{$set:{ready:undefined}});
      } else CollectItems.update({game:gameId},{$set:{ready:undefined}});
    }
  });
}
