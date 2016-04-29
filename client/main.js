import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
//   this.asd = "!!!!!";
// });
//
// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
//   asd() {
//     return Template.instance().asd.get();
//   }
// });
//
// Template.hello.events({
//   'click #1'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
//   'click #2'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() - 1);
//   },
// });

Template.body.rendered = function() {
  // Assuming you're using jQuery
  var x=100,y=100;
  var value=25;
  var move = function() {
    $("#crosshair").css('left',x);
    $("#crosshair").css('top',y);
  }
  move();
  $('body').on('keydown',function(event) {
    if(event.keyCode == 32) { //space=32
      console.log("fire");
    } else if(event.keyCode == 65) { //a=65
      console.log("links");
      x-=value;
      move();
    } else if(event.keyCode == 68) { //d=68
      console.log("rechts");
      x+=value;
      move();
    } else if(event.keyCode == 87) { //w=87
      console.log("oben");
      y-=value;
      move();
    } else if(event.keyCode == 83) { //s=83
      console.log("unten");
      y+=value;
      move();
    }
  });
}
