var navigation = {
  left: function() {
    var next = this.current.prev();
    if(next.length>0) this.select(next);
  },
  right: function() {
    var next = this.current.next();
    if(next.length>0) this.select(next);
  },
  enter: function() {
    var currentTarget = this.current;
    Session.set('picSize', this.collectPicSize(currentTarget.find('.gameItem')));
    this.hideAllNotPicto();
    setTimeout(() => {
      Router.go('game', {_gameID: currentTarget.attr('path')});
    },200)
  },
  hideAllNotPicto() {
    $('#title,.highscores,.gameItem').addClass('no_opacity');
  },
  select: function(target) {
    if(this.current!=undefined) {
      this.current.removeClass('selected');
    }
    if(target==undefined) {
      // console.log();
      target = this.menu.children()[0];
    }
    target = $(target);
    target.addClass('selected');
    this.current = target;
  },
  current: null,
  menu: null,
  collectPicSize: function(target) {
    var picSize = target.offset();
    picSize.width = target.width();
    picSize.height = target.height();
    // console.log(picSize);
    return picSize;
  },
}
function onKeyDown(e) {
  if(e.keyCode==39) navigation.right();
  else if(e.keyCode==37) navigation.left();
  else if(e.keyCode==32) navigation.enter();
}

Template.menu.onRendered(function() {
  navigation.menu = $('#menu_lu');
  $('body').on('keydown',onKeyDown);
  navigation.select();
});
Template.game_menu.events({
  'mouseover .menu_li': function(e,i) {
    navigation.select(i.find('.menu_li'));
  },
  'click .menu_li': function(e,i) {
    navigation.select(i.find('.menu_li'));
    navigation.enter();
  }
});
Template.menu.onDestroyed(function() {
  $('body').unbind('keydown',onKeyDown);
});
