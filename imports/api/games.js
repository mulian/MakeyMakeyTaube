var games = null;
var calls = [];

Meteor.call('getGames',function(err,result) {
  games = result;
  var call=undefined;
  while(( call=calls.pop())!=undefined) {
    call(games);
  }
});

var getGames = function(callback) {
  if(games!=null) {
    callback(games);
  } else {
    calls.push(callback);
  }
}

export {getGames};
