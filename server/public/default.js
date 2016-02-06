
window.onload = function () {

      var socket = io();
      
      socket.on('log', function(msg) {
          logText.innerHTML += msg + "\n";
          
      });

     

};

