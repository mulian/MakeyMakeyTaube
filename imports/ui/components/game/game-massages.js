//Notie
import notie from 'notie';
import 'notie/dist/notie.css';

export var message = {
  timeless: function(min,sec) {
    var str = 'Ihr habt '+min+' Minuten Zeit!';
    if(sec!=undefined && sec>0) {
      str = 'Ihr habt '+min+' Minuten und '+sec+' Sekunden Zeit!'
    }
    notie.alert(2, str, 5);
  },
  collectItems: function(count) {
    var str = "";
    if(count==1) {
      str = 'Sammel den letzten Gegenstand ein.';
    } else {
      str = 'Sammel die '+count+' Gegenstände ein.';
    }
    notie.alert(2, str, 5);
  },
  win: function(index) {
    notie.alert(1, "Getroffen! Ihr seid Team " + index+ ".", 3)
  },
  notWin: function() {
    notie.alert(3, "Zeit abgelaufen!", 3)
  },
  onlyGoal: function() {
    notie.alert(2, 'Super, jetzt in das grün markierte Ziel!', 5);
  },
  gotoGoal: function() {
    notie.alert(2, 'Lenk den Cursor in das grün markierte Ziel!', 5);
  },
};
