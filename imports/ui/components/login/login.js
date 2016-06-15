import './login.html'

Template.app_login.onRendered(function() {
});

Template.app_login.events({
  'click #login-dropdown-list': function(e,i) {
    setTimeout(() => {
      if((window.location.host.indexOf('home.wi2.phil.tu-bs.de')>=0) &&
        (window.location.hash.indexOf('letmein')<0) &&
        (Meteor.userId()==null))
        $('#signup-link').remove();
    }, 50);
  },
});
