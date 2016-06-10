import './file-drop.html'
import './file-drop.less'


Template.dropzone.onRendered(function() {
  this.dropzone.on('complete',function(file) {
    // console.log("complete",file);
    $('#dropzoneDiv').hide();
    $('#folder').show();
    $('#head').show();
  });

  var goTo = false;
  $('body').on('dragenter',function(e) {
    if(e.originalEvent.dataTransfer.types=='Files') {
      goTo=true;
      $('#folder').hide();
      $('#head').hide();
      $('#dropzoneDiv').show();
      setTimeout(() => {
        goTo=false;
      },200);
    }
  })
  $('body').on('dragleave',function(e) {
    if(e.originalEvent.dataTransfer.types=='Files') {
      if(!goTo) {
        $('#dropzoneDiv').hide();
        $('#folder').show();
        $('#head').show();
      }
    }
  })
});
