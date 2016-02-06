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
    
    io.on('connection', function(socket){
        logIO('New client connected: ' + socket.id);
        
        
        socket.emit('login', {boardSize: 12, player1Id: process.env.Player1DeviceId , player2Id: process.env.Player2DeviceId });    
    });
        
    loadDevices().then(function() {
        spark.getEventStream('move', 'mine' , handleMove);
    });
});

app.get('/', function(req, res) {
 res.sendFile(__dirname + '/public/default.html');
});

spark.on('login', function() {
    
    loadDevices().then(function() {
        spark.getEventStream('move', 'mine' , handleMove);
    });
});

io.on('connection', function(socket){
        logIO('New client connected: ' + socket.id);
        
        
        socket.emit('login', {boardSize: 12, player1Id: process.env.Player1DeviceId , player2Id: process.env.Player2DeviceId });    
    });

var Player = function() {
    var _self = this;
    _self.Position = []
}
var GameObject = function() {
    var _self = this;
    var width = 8;
    var height = 8;
    _self.Maze = generator(width, height);
    _self.Players = [new Player, new Player];
    this.Players[0].Position = [0,0];
    this.Players[1].Position = [width - 1, height - 1];
    this.Player1Turn = true;
    
    _self.CheckMove = function(Player1Move, direction) {
        if (this.Player1Turn != Player1Move) { return; } // it's not your turn
        if (this.Player1Turn) {
            if (ValidateAndMove(_self.Players[0], direction))
                return GetDistanceBetweenPlayers();
            return -1;
        }
        else
        {
            if (ValidateAndMove(_self.Players[1], direction))
                return GetDistanceBetweenPlayers();
            return -1;
        }
    }
    
    function GetDistanceBetweenPlayers() {
        var x1 = _self.Players[0].Position[0];
        var x2 = _self.Players[1].Position[0];
        var y1 = _self.Players[0].Position[1];
        var y2 = _self.Players[1].Position[1];
        return ( Math.abs( x1 - x2 ) + Math.abs(y1 - y2) );
    }
    
    function ValidateAndMove(player, direction) {
        if (!_self.Maze.IsWall(player.Position[0], player.Position[1], direction)) {
            switch(direction) {
                case 0: //up
                    player.Position[0] -= 1;
                break;
                case 1: //right
                    player.Position[1] += 1;
                break;
                case 2: //down
                    player.Position[0] += 1;                
                break;
                case 3:
                    player.Position[1] -= 1;
                break;
                default:
                    return false;
                break;
            }
            return true;
        }
        return false;
    }
}

var game = new GameObject();

function handleMove(msg) {
    var distance = -1;
  
    if (!msg) {
       return; 
    }
    
    logIO("new move from player: " + process.env.Player1DeviceId)

    if (msg.deviceid === process.env.Player1DeviceId) {
        distance = game.CheckMove(true, move);
        
        player1Device.callFunction("moveResult", distance);
        player2Device.callFunction("yourMove", distance);
        io.emit("move", {move: move, player: msg.deviceid });
        
    } else if (msg.deviceid === process.env.Player2DeviceId) {
        distance = game.CheckMove(false, move);
        
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

function logIO(logString) {
    console.log(logString);
   // io.emit('log', logString);
}

//spark.login({ accessToken: process.env.ParticleAccessToken });

http.listen(port, function() {
    console.log('listening on *: ' + port);
});