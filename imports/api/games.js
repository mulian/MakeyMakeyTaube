
//TODO: remove history loading call?!

// console.log("route gerade:");
var originalPath = window.location.pathname;
var games = null;
Router.go('loading');
Meteor.call('getGames',function(err,result) {

  games = result;
  // console.log(games);
  Router.go(originalPath);
  // window.location.replace(originalPath);
});

var getGames = function() {
  return games;
}

export {getGames};
