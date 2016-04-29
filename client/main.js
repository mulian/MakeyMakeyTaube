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
  var x=100,y=100;
  var value=40;
  var ch = $("#crosshair");

  var NONE=0,LEFT=11,RIGHT=12,UP=21,DOWN=22;
  var move = function(direction) {
    if(direction==undefined) direction=NONE;
    if(direction==0) {
      ch.css('left',x);
      ch.css('top',y);
    } else if(direction<20) { //left/right
      if(direction==LEFT) x-=value;
      if(direction==RIGHT) x+=value;
      ch.css('left',x);
    } else if(direction>20) { //UP/DOWN
      if(direction==UP) y-=value;
      if(direction==DOWN) y+=value;
      ch.css('top',y);
    }
  }

  move(); //init move
  $('body').on('keydown',function(event) {
    if(event.keyCode == 32) { //space=32
      console.log("fire");
    } else if(event.keyCode == 65) { //a=65
      move(LEFT);
    } else if(event.keyCode == 68) { //d=68
      move(RIGHT);
    } else if(event.keyCode == 87) { //w=87
      move(UP);
    } else if(event.keyCode == 83) { //s=83
      move(DOWN);
    }
  });
}
