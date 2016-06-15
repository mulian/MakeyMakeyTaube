import './login.html'

Template.app_login.onRendered(function() {
  console.log(location.host);
  if((window.location.host.indexOf('home.wi2.phil.tu-bs.de')>=0) &&
    (window.location.hash.indexOf('letmein')<0) &&
    (Meteor.userId()==null))
    $('#signup-link').remove();
});
