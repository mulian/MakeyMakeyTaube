import {Crosshair,Games,Players,CollectItems,Sounds,Config,Images} from '../../../api/booth/db.js'
import {pickFile} from '../file/file.js'

Template.editor.events({
  'click button.soundColected': function(e,instance) {
    pickFile((file) => {
      if(file._id==undefined) file._id = null;
      Config.update({_id:Config.findOne({})._id},{$set:{soundOnCollect:file._id}})
    });
  },
  'click button.soundWin': function(e,instance) {
    pickFile((file) => {
      if(file._id==undefined) file._id = null;
      Config.update({_id:Config.findOne({})._id},{$set:{soundOnWin:file._id}})
    });
  },
  'click button.soundLose': function(e,instance) {
    pickFile((file) => {
      if(file._id==undefined) file._id = null;
      Config.update({_id:Config.findOne({})._id},{$set:{soundOnLose:file._id}})
    });
  },
});
