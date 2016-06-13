import {Crosshair,Games,Players,CollectItems,Sounds,Images,Config} from '../../../api/booth/db.js'

var keyIntervalTime = 100;
var keyInterval = {};
function press(keyCode,down=true) {
  if(down && keyInterval[keyCode]==undefined) {
    var m = move(keyCode);
    // m();
    keyInterval[keyCode] = setInterval(function() {
      m();
    },keyIntervalTime);
  } else if(!down && keyInterval[keyCode]!=undefined) {
    clearInterval(keyInterval[keyCode]);
    delete keyInterval[keyCode];
  }
}
function move(keyCode) {
  function changePossible(crosshair,kind='x',inc=1) {
    if(kind=='x') {
      if((crosshair.x+inc)>-1 && (crosshair.x+inc)<98) {
        console.log('x true',crosshair.x);
        return true;
      }
      else return false;
    } else {
      if((crosshair.y+inc)>-1 && (crosshair.y+inc)<98) return true;
      else return false;
    }
  }
  return function() {
    let crosshair = Session.get('crosshair');
    switch(keyCode) {
      case 37: //left
        if(changePossible(crosshair,'x',-1)) crosshair.x-=1;
      break;
      case 38: //up
        if(changePossible(crosshair,'y',-1)) crosshair.y-=1;
      break;
      case 39: //right
        if(changePossible(crosshair,'x',+1)) crosshair.x+=1;
      break;
      case 40: //down
        if(changePossible(crosshair,'y',+1)) crosshair.y+=1;
        break;
    }
    Session.set('crosshair',crosshair);
  }
}
function onKeyDown(e) {
  if(e.keyCode>=37 && e.keyCode<=40) {
    e.preventDefault();
    press(e.keyCode);
  }
}
function onKeyUp(e) {
  if(e.keyCode>=37 && e.keyCode<=40) {
    e.preventDefault();
    press(e.keyCode,false);
  }
}
Template.game.onRendered(function() {
  setTimeout(() => {
    $('body').on('keydown',onKeyDown);
    $('body').on('keyup',onKeyUp);
  },0.5*1000);
});
Template.game.onDestroyed(function() {
  $('body').unbind('keydown',onKeyDown);
  $('body').unbind('keyup',onKeyUp);
});
