import {Sounds,Images} from '../../../api/booth/db.js';
var fs = Npm.require('fs');

var path = "/upload/";
// Meteor.startup(function() {
//   Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
// });
UploadServer.init({
  // tmpDir: process.env.PWD + '/public/uploads',
  // uploadDir: process.env.PWD + '/public/uploads',
  tmpDir: '/root/taube/uploads',
  uploadDir: '/root/taube/uploads',
  checkCreateDirectories: true,
  uploadUrl: path,
  // *** For renaming files on server
  // getFileName: function(file, formData) {
  //   return new Date().getTime() + '-' + Math.floor((Math.random() * 10000) + 1) + '-' + file.name;
  // },
  finished: function(fileInfo, formFields) {
    // var fileName = fileInfo.url.substring(fileInfo.url.lastIndexOf('/')+1,fileInfo.url.length)
    // var fileUrl = '/upload/'+fileInfo.name;
    // console.log(fileName,fileUrl);

    fileInfo.url = path+fileInfo.name;
    console.log(fileInfo);
    if(/^audio.*/.test(fileInfo.type)) {
      // console.log("ist audio!");
      Sounds.insert(fileInfo);
    } else if(/^image.*/.test(fileInfo.type)) {
      // console.log("ist bild!");
      Images.insert(fileInfo);
    }
  },
});
var currentFolderId = null;
var currentUserId = null;
Meteor.methods({
  currentFolder: function(folderId) {
    // console.log(folderId);
    currentFolderId = folderId;
  },
  setUserId: function(userId) {
    currentUserId = userId;
  }
});
