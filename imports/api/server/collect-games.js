const fs = require('fs');

/*
  This File will collect the games, from public Folder
*/

//depreciadet! CHANGE THIS!
var base = process.env.PWD;

var gameRootPath = base+'/public/';
console.log(`Your Game root Path is: ${gameRootPath}`);

export default
class CollectGames {
  constructor() {
    this.searchGameFolders();
    // this.watchIt();
  }
  watchIt() {
    console.log("WATCH!");
    // watch(gameRootPath,(item) => {
    //   console.log("jo");
    //   this.searchGameFolders();
    // });
  }
  searchGameFolders() {
    this.games = []; //flush games
    var dir = fs.readdirSync(gameRootPath);
    for(item of dir) {
      if(fs.statSync(gameRootPath+item).isDirectory()) { //all Dirs
        var config = gameRootPath+item+'/game-config.json'
        if(fs.existsSync(config)) {
          // console.log(Npm.require.cache);
          // Object.keys(Npm.require.cache).forEach(function(key) { delete Npm.require.cache[key] })
          // delete Npm.require.cache[Npm.require.resolve(config)]
          var gameObj = Npm.require(config);
          gameObj.path = item;
          this.games.push(gameObj);
        }
      }
    }
    console.log(this.games);
    // console.log(fs.statSync(rootDir+gameRootPath+'baseball/game-config.json').isDirectory());
  }
}
