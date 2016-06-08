import GameClass from './Games.js'
export const Players = new Mongo.Collection('players');
export const Configurations = new Mongo.Collection('configurations');
export const Games = new GameClass();

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
}
