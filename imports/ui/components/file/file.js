import './file.html'
import './file.less'

import {Sounds,Images} from '../../../api/booth/db.js';

var callback = null;
export function pickFile(cb) {
  callback = cb;
  $('.file-manager').show();
}
function pick(file,e,i) {
  if(callback!=null) {
    callback(file,e,i);
    $('.file-manager').hide();
    callback = null;
  } else console.log("error file");
}

Template.file_sounds.helpers({
  sounds: function() {
    // console.log(Sounds.find({}).count());
    return Sounds.find({});
  }
});
Template.file_images.helpers({
  images: function() {
    // console.log(Images.find({}).count());
    return Images.find({});
  }
});

Template.file_images.events({
  'click .file': function(e,i) {
    pick(this,e,i);
  },
});
Template.file_sounds.events({
  'click .file': function(e,i) {
    pick(this,e,i);
  },
});
