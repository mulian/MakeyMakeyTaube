Template.complete.helpers({
    'click #clear': function(e,t) {
        Meteor.call('resetShoots');
    }
});