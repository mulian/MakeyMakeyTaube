import GameClass from './Games.js'
export const Players = new Mongo.Collection('players');
export const Config = new Mongo.Collection('config');
export const Games = new GameClass();
export const CollectItems = new Mongo.Collection('collectitems');
export const Sounds = new Mongo.Collection('sounds');
export const Images = new Mongo.Collection('images');

if(Meteor.isServer) {
  Meteor.publish('default_db_players', function(){
    return Players.find({});
  });
  Meteor.publish('default_db_config', function(){
    if(Config.find({}).count()==0) Config.insert({});
    return Config.find({},{limit:1});
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
  Meteor.publish('default_db_images', function(){
    return Images.find({});
  });

  Meteor.methods({
    resetColectItems: function(gameId) {
      if(gameId==undefined) {
        CollectItems.update({},{$set:{ready:undefined}});
      } else CollectItems.update({game:gameId},{$set:{ready:undefined}});
    }
  });
}
