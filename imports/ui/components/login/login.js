import './login.html'

Template.app_login.onRendered(function() {
});

/*
function removeCreate() {
  if((window.location.host.indexOf('home.wi2.phil.tu-bs.de')>=0) &&
    (window.location.hash.indexOf('letmein')<0) &&
    (Meteor.userId()==null))
    $('#signup-link').remove();
}

Template.app_login.events({
  'click #login-buttons': function(e,i) {
    // console.log("click");
    setTimeout(removeCreate, 100);
    setTimeout(removeCreate, 50);
    setTimeout(removeCreate, 1);
  },
});
*/
