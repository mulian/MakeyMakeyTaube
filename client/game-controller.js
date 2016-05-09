import Games from "./games.json";
//Notie
import notie from 'notie';
import 'notie/dist/notie.css';

module.exports = {
  init: function() {
    this.img = $('#background_img');
    this.setPicSize();
  },
  getGameById: function(id) {
    for (var i = 0; i < Games.length; i++) {
      if (Games[i].id == id) {
        return Games[i];
      }
    }
  },
  gotoMenu: function() {
    // var img = $('#background_img');
    console.log("leave!");
    this.img.removeClass('transform');
    setTimeout(function() {
      Router.go('/');
    }, 500)
  },
  setPicSize: function() {
    var _this = this;
    var picSize = Session.get('picSize');
    if (picSize != null) {
      this.img.css('width', picSize.width);
      this.img.css('height', picSize.height);
      this.img.css('left', picSize.left);
      this.img.css('top', picSize.top);
      Session.set('picSize', null); //no need, becaus of menu onCreate reset?
      setTimeout(function() {
        _this.img.addClass('transform');
      }, 1);
    } else {
      this.img.addClass('transform');
    }
  },
  _goalReached: function() {
    return this.withThis(this.goalReached);
  },
  goalReached: function() {
    this.gotoMenu();
    notie.alert(1, "Gewonnen!", 2)
  },
  _goalNotReached: function() {
    return this.withThis(this.goalNotReached);
  },
  goalNotReached: function() {
    notie.alert(3, "Falsch!", 1)
  },
  withThis: function(func) {
    _this = this;
    return function() {
      func.apply(_this);
    }
  },
}
