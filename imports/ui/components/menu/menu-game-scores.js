import {Games,Players,Config} from '../../../api/booth/db.js'

function addZero(number) {
  if(number<=9) return '0'+number;
  else return number;
}
Template.highscores.helpers({
  players: function(){
    var inc = 1;
    return Players.find({game: this._id}, {
      limit:Config.findOne({}).topTeamsCount,
      sort:{milisecounds:1},
      transform: function(item) {
        item.pos = inc++;
        var duration = moment.duration(item.milisecounds);
        item.time = addZero(duration.minutes())+':'+
          addZero(duration.seconds())+'.'+
            addZero(duration.milliseconds());
        if(Session.get('lastPlayer')==item.name) {
          item.highlight = 'highlight';
        }
        return item;
      }
    });
  }
})
