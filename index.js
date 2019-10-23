var columns = 50;
var rows = 50;
var grid = new Array(columns);

var widthArena;
var heightArena;
var start;
var end;
var currentPosition;
var lastMoviment;
var qtdMoviment = 0;
var path = [];

function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.neighbors = [];
    this.wall = false;
    this.visited = false;

    if (random(1) < 0.2) {
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
            this.neighbors.push(grid[this.x - 1][this.y - 1]);
        }
        if (this.x > columns - 1 && this.y > 0) {
            this.neighbors.push(grid[this.x + 1][this.y - 1]);
        }
        if (this.x > 0 && this.y > rows - 1) {
            this.neighbors.push(grid[this.x - 1][this.y + 1]);
        }
        if (this.x > columns - 1 && this.y > rows - 1) {
            this.neighbors.push(grid[this.x + 1][this.y + 1]);
        }
    }

    this.getDownPosition = function() {
        if (this.y + 1 < rows - 1) {
            let downPosition = grid[this.x][this.y + 1]
            return downPosition;
        } else {
            return null;
        }        
    }
    this.getRightPosition = function() {
        if (this.x + 1 < columns - 1) {
            let rightPosition = grid[this.x + 1][this.y];
            return rightPosition;
        } else {
            return null;
        }        
    }
    this.getUpPosition = function() {
        if (this.y - 1 > 0) {
            let upPosition = grid[this.x][this.y - 1];        
            return upPosition;
        } else {
            return null;
        }        
    }
    this.getLeftPosition = function() {
        if (this.x - 1 > 0) {
            let leftPosition = grid[this.x - 1][this.y];
            return leftPosition;
        } else {
            return null;
        }             
    }
    
    
    this.isAvailable = function(position) {
        if (position && !position.visited && !position.wall) {
            return true;
        } else {
            return false;
        }
    }
}

function Grid(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.matrix = new Array(columns)
    for (let i = 0; i < columns; i++) {
        this.matrix[i] = new Array(rows);
    }

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            this.matrix[i][j] = new Spot(i, j);
        }
    }

    this.getSpot = function(x, y) {
        return this.matrix[x][y]
    }    
}

function setup() {
    createCanvas(500, 500);

    widthSpotArena = width / columns;
    heightSpotArena = height / rows;

    //Criando a matriz
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

    let downPosition = currentPosition.getDownPosition();
    let rightPosition =  currentPosition.getRightPosition();
    let upPosition = currentPosition.getUpPosition();
    let leftPosition = currentPosition.getLeftPosition();

    console.log(downPosition,rightPosition,upPosition, leftPosition);

    let downPositionIsAvailable = currentPosition.isAvailable(downPosition);
    let rightPositionIsAvailable = currentPosition.isAvailable(rightPosition);
    let upPositionIsAvailable = currentPosition.isAvailable(upPosition);
    let leftPositionIsAvailable = currentPosition.isAvailable(leftPosition);

    qtdMoviment++;

    console.log(downPositionIsAvailable, rightPositionIsAvailable, upPositionIsAvailable, leftPositionIsAvailable);
    console.log(qtdMoviment);
    console.log(lastMoviment);

    noLoop();   

    if (downPositionIsAvailable && lastMoviment != 'down' && lastMoviment != 'up') {
        path.push(currentPosition);
        currentPosition.visited = true;
        currentPosition = downPosition;
        lastMoviment = 'down';
    } else if (rightPositionIsAvailable) {
        path.push(currentPosition);
        currentPosition.visited = true;
        currentPosition = rightPosition;
        lastMoviment = 'right';
    } else if (downPositionIsAvailable && lastMoviment != 'up') {       
        path.push(currentPosition);
        currentPosition.visited = true;
        currentPosition = downPosition;
        lastMoviment = 'down';
    } else if (upPositionIsAvailable) {        
        path.push(currentPosition);
        currentPosition.visited = true;
        currentPosition = upPosition;
        lastMoviment = 'up';        
    } else if (leftPositionIsAvailable) {
        path.push(currentPosition);
        currentPosition.visited = true;
        currentPosition = leftPosition;
        lastMoviment = 'left';

    }

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(255, 0, 0));
    }

    currentPosition.show(color(0, 255, 0));    
}