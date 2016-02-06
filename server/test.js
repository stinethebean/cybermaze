var generator = require("./maze");
var maze = generator(8, 8);
maze.print();
var text = JSON.stringify(maze.GetMap());
console.log(text);