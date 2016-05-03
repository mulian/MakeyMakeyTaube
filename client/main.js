import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

// Notie
import notie from 'notie';
import 'notie/dist/notie.css';

Template.body.rendered = function() {
  var x = 100, y = 100;
  var value = 40;
  var ch = $("#crosshair");

  var NONE = 0, LEFT = 11, RIGHT = 12, UP = 21, DOWN = 22;
  var move = function(direction) {
    if(direction == undefined) direction = NONE;
    if(direction == 0) {
      ch.css('left',x);
      ch.css('top',y);
    } else if(direction < 20) { //left/right
      if(direction == LEFT) x -= value;
      if(direction == RIGHT) x += value;
      if(x < 0) {
        x = 0;
      } else if ((x + value) > window.innerWidth) {
        x -= value;
      } else {
        ch.css('left',x);
      }
    } else if(direction > 20) { //UP/DOWN
      if(direction == UP) y -= value;
      if(direction == DOWN) y += value;
      if(y < 0) {
        y = 0;
      } else if ((y + value) > window.innerHeight) {
        y -= value;
      } else {
        ch.css('top',y);
      }
    }
  }

  move(); //init move
  $('body').off().on('keydown', function(event) {
    switch(event.keyCode) {
      case 32:
        console.log("Geschossen!");
        notie.alert(1, 'FIRE!',2);
        var offset = $('img#crosshair').offset();
        var xpos = offset.left+30;
        var ypos = offset.top-60;
        var colors = ['#bada55', '#B43831', '783BA3', '#00AB1B', '#143275', '#FFA700'],
            color = Random.choice(colors), border = Random.choice(colors);
        var saveShoot = Shapes.insert({'x': xpos, 'y': ypos, 'border': border, 'color': color});
        console.log(saveShoot);
        setTimeout(function(){
          //Shoots.remove({_id:saveShoot});
        }, 5000);
        event.preventDefault();
        break;
      case 65:
        move(LEFT);
        break;
      case 68:
        move(RIGHT);
        break;
      case 87:
        move(UP);
        break;
      case 83:
        move(DOWN);
        break;
    }
  });
}

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
