var columns = 50;
var rows = 50;
var grid = new Array(columns);

var widthArena;
var heightArena;
var start;
var end;
var currentPosition;
var lastMoviment;
var path = [];

function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.neighbors = [];
    this.wall = false;
    this.visited = false;

    if (random(1) < 0.1) {
        this.wall = true;
    }

    this.show = function (color) {
        fill(color);
        if (this.wall) {
            fill(0);
        }
        // noStroke();           
        rect(this.x * widthSpotArena, this.y * heightSpotArena, widthSpotArena, heightSpotArena);
    }

    this.addNeighbors = function (grid) {
        if (this.x < columns - 1) {
            this.neighbors.push(grid[this.x + 1][this.y]);
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.x - 1][this.y]);
        }
        if (this.y < rows - 1) {
            this.neighbors.push(grid[this.x][this.y + 1]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.x][this.y - 1]);
        }
        if (this.x > 0 && this.y > 0) {
            this.neighbors.push(grid[this.x - 1][this.y - 1])
        }
        if (this.x > columns - 1 && this.y > 0) {
            this.neighbors.push(grid[this.x + 1][this.y - 1])
        }
        if (this.x > 0 && this.y > rows - 1) {
            this.neighbors.push(grid[this.x - 1][this.y + 1])
        }
        if (this.x > columns - 1 && this.y > rows - 1) {
            this.neighbors.push(grid[this.x + 1][this.y + 1])
        }
    }
}

function setup() {
    createCanvas(500, 500);

    widthSpotArena = width / columns;
    heightSpotArena = height / rows;

    // Criando a matriz
    for (var i = 0; i < columns; i++) {
        grid[i] = new Array(rows);
    };

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    currentPosition = start;
    end = grid[columns - 1][rows - 1];
    start.wall = false;
    end.wall = false;
}

function draw() {
    background(0)

    if (currentPosition === end) {
        alert("Encontrei a saída!");
        noLoop();
    }

    var downPosition = grid[currentPosition.x][currentPosition.y + 1];
    var rightPosition = grid[currentPosition.x + 1][currentPosition.y];
    var upPosition = grid[currentPosition.x][currentPosition.y - 1];
    // var leftPosition = grid[currentPosition.x - 1][currentPosition.y];

    var availableDownPosition = downPosition ? downPosition.visited === false && downPosition.wall === false : false;
    var availableRightPosition = rightPosition.visited === false && rightPosition.wall === false;
    var availableUpPosition = upPosition ? upPosition.visited === false && upPosition.wall === false : false;
    // var availableLeftPosition = leftPosition? 

    if (availableDownPosition && lastMoviment != 1) {
        path.push(currentPosition);
        currentPosition = downPosition;
        lastMoviment = 1;
    } else if (availableRightPosition) {
        path.push(currentPosition);
        currentPosition = rightPosition;
        lastMoviment = 2;
    } else if (availableDownPosition) {
        path.push(currentPosition);
        currentPosition = downPosition;
        lastMoviment = 1;
    } else if (availableUpPosition) {
        path.push(currentPosition);
        currentPosition = upPosition;
        lastMoviment = 1;
    }

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(255, 0, 0));
    }

    // for (var i = 0; i < openSet.length; i++) {
    //     currentPosition.show(color(0,255,0))
    // }

    currentPosition.show(color(0, 255, 0));


    // for (var i = 0; i < path.length; i++) {
    //     path[i].show(color(0, 0, 255));
    // }
}

// var moviment= function(currentPosition, locationMoviment, pathTavaled) {
//     pathTraveled.push(currentPosition);
//     currentPosition = downPosition;
// }

// function xAxisMoviment() {
//     positionX = positionX + 1;
// }

// function yAxisMoviment() {
//     positionY = positionY + 1;
// }