var games = null;
var calls = [];

// Call Meteor Server Function (throw sockets)
Meteor.call('getGames',function(err,result) {
  games = result;
  var call=undefined;
  // pop all games from games and call, if defined (laizy load)
  while(( call=calls.pop())!=undefined) {
    call(games);
  }
});

// returns games or add it to get a late callback
var getGames = function(callback) {
  if(games!=null) {
    callback(games);
  } else {
    calls.push(callback);
  }
}

export {getGames};
