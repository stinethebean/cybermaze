
window.onload = function () {

      var socket = io();
      
      socket.on('log', function(msg) {
          logText.innerHTML += msg + "\n";
          
      });

    socket.on('login', function(msg) {
        logText.innerHTML += "Board Size: " + msg.boardSize + "\n";
    })
        

};

