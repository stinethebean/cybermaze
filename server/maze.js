Array.prototype.remove = function(item) {
    for(var index = 0; index < this.length; index++) {
        if(this[index] === item) {
            this.splice(index, 1);
            return;
        }
    }
}

// random helper function
function nextInt(max) {
    return Math.floor(Math.random() * max);
}

// Room class, represents a single section of the maze
// Used by Maze class
function Room(x, y) {
    var _self = this;
    // coordinates of room in maze
    _self.x = x;
    _self.y = y;
    // top, right, bottom, left
    // -1 = uninitialized, 0 = open, 1 = closed
    _self.walls = [-1,-1,-1,-1];
    // indicates if any wall has been set to open or closed
    _self.isInitialized = function() {
        return _self.walls[0] >= 0 || _self.walls[1] >= 0 || _self.walls[2] >= 0 || _self.walls[3] >= 0;
    }
    // indicates if all walls has been set to open or closed
    _self.isConstructed = function() {
        return _self.walls[0] >= 0 && _self.walls[1] >= 0 && _self.walls[2] >= 0 && _self.walls[3] >= 0;
    }
}

// Maze class, initialize with the size of the maze you want
function Maze(rows, columns) {

    var _self       = this;
    _self.rows      = rows;
    _self.columns   = columns;
    // this holds all the rooms ina two dimensional array
    // see _self.initialize and _self.construct
    _self.map       = [];

    // initializes the maze map with empty rooms
    _self.initialize = function() {
        for(var y=0;y<_self.rows;y++) {
            _self.map.push([]);
            for(var x=0;x<_self.columns;x++) {
                _self.map[y].push(new Room(x, y));
            }
        }
    }
    
    // constructs the maze
    _self.construct = function() {

        // backlog is an array of unfinished rooms from wich we "grow" the maze
        var backlog = [_self.map[0][0]];

        // keep looping until the backlog is empty
        while(backlog.length > 0) {

            // pick a random room
            var room = backlog[nextInt(backlog.length)];

           // remove room from backlog if all walls have been constructed
            if(room.isConstructed()) {
                backlog.remove(room);
                continue;
            }

           // populate an array with indexes of uninitalized walls for the current room
            var wallIndexes = [];
            for(var i=0;i<room.walls.length;i++) {
                if(room.walls[i] < 0)
                    wallIndexes.push(i);
            }

            // pick a random wall
            var wallIndex = wallIndexes[nextInt(wallIndexes.length)];

            // variable for next room
            var nextRoom = null;

            switch(wallIndex) {
                // top wall
                case 0:
                    // outside of map or picked room is already initialized and in the backlog
                    if(room.y == 0 || _self.map[room.y-1][room.x].isInitialized()) {
                        // set wall to closed
                        room.walls[wallIndex] = 1;
                        continue;
                    }
                    nextRoom = _self.map[room.y-1][room.x];
                break;
                // right wall
                case 1:
                    // outside of map or picked room is already initialized and in the backlog
                    if(room.x == _self.columns - 1 || _self.map[room.y][room.x + 1].isInitialized()) {
                        // set wall to closed
                        room.walls[wallIndex] = 1;
                        continue;
                    }
                    nextRoom = _self.map[room.y][room.x+1];
                break;
                // bottom wall
                case 2:
                    // outside of map or picked room is already initialized and in the backlog
                    if(room.y == _self.rows - 1 || _self.map[room.y+1][room.x].isInitialized()) {
                        // set wall to closed
                        room.walls[wallIndex] = 1;
                        continue;
                    }
                    nextRoom = _self.map[room.y+1][room.x];
                break;
                // left wall
                case 3:
                    // outside of map or picked room is already initialized and in the backlog
                    if(room.x == 0 || _self.map[room.y][room.x-1].isInitialized()) {
                        // set wall to closed
                        room.walls[wallIndex] = 1;
                        continue;
                    }
                    nextRoom = _self.map[room.y][room.x-1];
                break;
                default:
                    throw "dafuc";
                break;
            }

            // find wall index of next room leading to the current room
            var nextRoomWallIndex = 0;
            switch(wallIndex) {
                // top wall -> bottom wall
                case 0:
                    nextRoomWallIndex = 2;
                break;
                // right wall -> left wall
                case 1:
                    nextRoomWallIndex = 3;
                break;
                // bottom wall -> top wall
                case 2:
                    nextRoomWallIndex = 0;
                break;
                // left wall -> right wall
                case 3:
                    nextRoomWallIndex = 1;
                break;
                default:
                    throw "dafuc";
                break;
            }           

            // set walls between rooms to open
            room.walls[wallIndex] = 0;
            nextRoom.walls[nextRoomWallIndex] = 0;
            // add next room to backlog
            backlog.push(nextRoom);
        }

    }
    
    _self.IsWall = function(x, y, direction) {
        return _self.map[y][x].walls[direction];
    }

    // prints maze using console.log
    _self.print = function() {
        console.log(new Array(_self.columns+1).join(" _"));
        for(var y=0;y<_self.rows;y++) {
            var str = "";
            for(var x=0;x<_self.columns;x++) {
                str += x == 0 ? "|" : "";
                str += _self.map[y][x].walls[2] == 1 ? "_" : " ";
                str += _self.map[y][x].walls[1] == 1 ? "|" : " ";
            }   
            console.log(str);
        }
    }

    _self.initialize();
    _self.construct();
}

var Generator = function MazeGen(height, width) {
    var maze = new Maze(height, width);
    module.exports.print = maze.print;
    module.exports.IsWall = maze.IsWall;
    return maze;
}

module.exports = Generator;
