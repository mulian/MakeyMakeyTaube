import {Crosshair,Games,Players,CollectItems,Sounds,Config,Images} from '../../../api/booth/db.js'
import {pickFile} from '../file/file.js'

Template.editor.events({
  'click button.soundColected': function(e,instance) {
    pickFile((file) => {
      console.log(file);
      Config.update({_id:Config.findOne({})._id},{$set:{soundOnCollect:file._id}})
    });
  },
  'click button.soundWin': function(e,instance) {
    pickFile((file) => {
      Config.update({_id:Config.findOne({})._id},{$set:{soundOnWin:file._id}})
    });
  },
  'click button.soundOnLose': function(e,instance) {
    pickFile((file) => {
      Config.update({_id:Config.findOne({})._id},{$set:{soundOnLose:file._id}})
    });
  },
});
