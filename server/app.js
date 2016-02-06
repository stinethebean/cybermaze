var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);
var io = require('socket.io')(http);
var spark = require('spark');
var port = process.env.PORT || 3000;

var player1Device;
var player2Device;

app.get('/', function(req, res) {
 res.sendFile(__dirname + '/public/default.html');
});

spark.on('login', function() {
    
    loadDevices().then(function() {
        spark.getEventStream('move', 'mine' , handleMove);
    });
});

function handleMove(msg) {
    var distance = -1;
  
    if (!msg) {
       return; 
    }
    
    logIO("new move from player: " + process.env.Player1DeviceId)

    if (msg.deviceid === process.env.Player1DeviceId) {
        distance = brianCheckMaze(true, move);
        
        player1Device.callFunction("moveResult", distance);
        player2Device.callFunction("yourMove", distance);
        io.emit("move", {move: move, player: msg.deviceid });
        
    } else if (msg.deviceid === process.env.Player2DeviceId) {
        distance = brianCheckMaze(false, move);
        
        player1Device.callFunction("moveResult", distance);
        player2Device.callFunction("yourMove", distance);
        io.emit("move", {move: move, player: msg.deviceid });
    }
}

function loadDevices() {
    return new Promise(function(fulfill, reject) {  
        
        spark.getDevice(process.env.Player1DeviceId, function(err, device1) {
            if (err) { 
                reject("Device not found: " + err);
                return;
            } 
            
            player1Device = device1;
            
            spark.getDevice(process.env.Player2DeviceId, function(err, device2) {
                if (err) { 
                    reject("Device not found: " + err);
                    return;
                } 
                
                player2Device = device2;
       
                fulfill();               
            });  
        });
    });
}

function brianCheckMaze(isPlayer1, move) {
    return 5;
}

io.on('connection', function(socket){
    
    logIO('New client connected: ' + socket.id);

    socket.emit('connect', {boardSize: 12});    
});
    
function logIO(logString) {
    console.log(logString);
    io.emit('log', logString);
}

spark.login({ accessToken: process.env.ParticleAccessToken });

http.listen(port, function() {
    console.log('listening on *: ' + port);
});