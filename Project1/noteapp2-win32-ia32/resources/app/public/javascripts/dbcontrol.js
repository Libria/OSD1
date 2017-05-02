window.onload= init;

function init() {
  var jsdom = require('jsdom');
  jsdom.env({
    html: "Notepad.html",
    done: function(error, window){
      var button = button.getElementById("savenote");
      button.onlick = handleButtonClick;
    }
  })
}

function handleButtonClick(e){
  alert("진입");
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('saveNote');

    alert("생성");

    db.serialize(function(){
      db.run("CREATE TABLE IF NOT EXISTS note (pr TEXT, con TEXT)");

      var stmt = db.prepare("INSERT INTO note values(?,?)");

      var da = new Date();
      var pr = da.toLocaleTimeString();

      var con = $("#memoarea").val();

      stmt.run(pr, con);
    });

    stmt.finalize();

    db.close();
}
