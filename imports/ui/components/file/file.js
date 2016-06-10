import './file.html'
import './file.less'

import {Sounds,Images} from '../../../api/booth/db.js';

Template.file_sounds.helpers({
  sounds: function() {
    console.log(Sounds.find({}).count());
    return Sounds.find({});
  }
});
Template.file_images.helpers({
  images: function() {
    console.log(Images.find({}).count());
    return Images.find({});
  }
});
