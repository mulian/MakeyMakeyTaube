var bg = null;

Template.game.onRendered(function() {
  // console.log(Session.get('picSize'));
  var picSize = Session.get('picSize');
  bg = $('#background_img');
  if(picSize!=undefined) {
    // console.log(picSize);
    bg.css(picSize);
  }
  setTimeout(() => {
    bg.addClass('transform');
  },1);
});

export var out = function(cb) {
  bg.removeClass('transform');
  setTimeout(function() {
    cb();
  },500);
};
