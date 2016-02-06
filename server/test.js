var generator = require("./maze");
var maze = new generator(12, 12);
maze.print();
maze.IsWall(2,2,2);