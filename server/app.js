var generator = require("./maze");
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

var GameObject = function() {
    var _self = this;
    var width = 8;
    var height = 8;
    _self.Maze = generator(width, height);
    _self.Player1Position = [0,0];
    _self.Player2Position = [width - 1, height - 1];
    _self.Player1Turn = true;
    
    _self.CheckMove = function(Player1Move, direction) {
        if (_self.Player1Turn != Player1Move) { return; } // it's not your turn
        return 5;
    }   
    
}

function handleMove(msg) {
    var distance = -1;
  
    if (!msg) {
       return; 
    }

    if (msg.deviceid === process.env.Player1DeviceId) {
        distance = GameObject.CheckMove(true, move);
        
        player1Device.callFunction("moveResult", distance);
        player2Device.callFunction("yourMove", distance);
        io.emit("move", {move: move, player: msg.deviceid });
        
    } else if (msg.deviceid === process.env.Player2DeviceId) {
        distance = GameObject.CheckMove(false, move);
        
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

io.on('connection', function(socket){
    console.log('Unity client connected');
    socket.emit('connect', {boardSize: 12});    
});
    

spark.login({ accessToken: process.env.ParticleAccessToken });

http.listen(port, function() {
    console.log('listening on *: ' + port);
});