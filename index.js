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
var downPositions;
var rightPositions;
var upPositions;
var leftPositions;
var path = [];
var finished = false;


function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.neighbors = [];
    this.wall = false;
    this.visited = false;

    if (random(1) < 0.25) {
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
    }

    this.getDownPosition = function() {
        if (this.y + 1 < rows) {
            let downPosition = grid[this.x][this.y + 1]
            return downPosition;
        } else {
            return null;
        }        
    }
    this.getRightPosition = function() {
        if (this.x + 1 < columns) {
            let rightPosition = grid[this.x + 1][this.y];
            return rightPosition;
        } else {
            return null;
        }        
    }
    this.getUpPosition = function() {
        if (this.y - 1 >= 0) {
            let upPosition = grid[this.x][this.y - 1];        
            return upPosition;
        } else {
            return null;
        }        
    }
    this.getLeftPosition = function() {
        if (this.x - 1 >= 0) {
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

    this.isWall = function(position) {
        if (position && position.wall) {
            return true;
        } else if(!position){
            return true;
        } else {
            return false
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

    frameRate(5);

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
        finished = true;
    }

    downPositions = 0;
    rightPositions = 0;
    upPositions = 0;
    leftPositions = 0;
    let tempPosition;
    let sensor = [];

    tempPosition = currentPosition;
    let downPosition;
    for(i = 0; i < 5 ; i++) {
        downPosition = tempPosition.getDownPosition();
        if (downPosition && !downPosition.wall) {
            downPositions++;
            tempPosition = downPosition;
        } else {
            break;
        }        
    }
    sensor.push(downPositions);
    
    tempPosition = currentPosition;    
    let rightPosition;
    for(i = 0; i < 5 ; i++) {
        rightPosition = tempPosition.getRightPosition();
        if (rightPosition && !rightPosition.wall) {
            rightPositions++;
            tempPosition = rightPosition;
        } else {
            break;
        }        
    }
    sensor.push(rightPositions);

    tempPosition = currentPosition;    
    let upPosition;
    for(i = 0; i < 5 ; i++) {
        upPosition = tempPosition.getUpPosition();
        if (upPosition && !upPosition.wall) {
            upPositions++;
            tempPosition = upPosition;
        } else {
            break;
        }        
    }
    sensor.push(upPositions);

    tempPosition = currentPosition;    
    let leftPosition;
    for(i = 0; i < 5 ; i++) {
        leftPosition = tempPosition.getLeftPosition();
        if (leftPosition && !leftPosition.wall) {
            leftPositions++;
            tempPosition = leftPosition;
        } else {
            break;
        }        
    }
    sensor.push(leftPositions);

    var bestChoice;
    for (side of sensor) {
        console.log(`side:${side}`)
        if (!bestChoice || side > bestChoice) {
            bestChoice = side;
        }

    }

    console.log(bestChoice);
    noLoop();


    
  

    console.log(`down:${downPosition},right:${rightPosition},up:${upPosition}, left:${leftPosition}`);

    let downPositionIsAvailable = currentPosition.isAvailable(downPosition);
    let rightPositionIsAvailable = currentPosition.isAvailable(rightPosition);
    let upPositionIsAvailable = currentPosition.isAvailable(upPosition);
    let leftPositionIsAvailable = currentPosition.isAvailable(leftPosition);

    let downPositionIsWall = currentPosition.isWall(downPosition);
    let rightPositionIsWall =  currentPosition.isWall(rightPosition);
    let upPositionIsWall = currentPosition.isWall(upPosition);
    let leftPositionIsWall = currentPosition.isWall(leftPosition)

    qtdMoviment++;
    console.log(currentPosition)
    console.log(`down:${downPositionIsAvailable}, right:${rightPositionIsAvailable}, up:${upPositionIsAvailable}, left:${leftPositionIsAvailable}`);
    console.log(qtdMoviment);
    console.log(lastMoviment);

    // noLoop();

    

    // if (downPositionIsAvailable && lastMoviment != 'down' && lastMoviment != 'up' && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = downPosition;
    //     lastMoviment = 'down';
    //     console.log("1");
    // } else if (rightPositionIsAvailable && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = rightPosition;
    //     lastMoviment = 'right';
    //     console.log("2");
    // } else if (downPositionIsAvailable && lastMoviment != 'up' && finished === false) {       
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = downPosition;
    //     lastMoviment = 'down';
    //     console.log("3");
    // } else if (upPositionIsAvailable && finished === false) {        
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = upPosition;
    //     lastMoviment = 'up';
    //     console.log("4");        
    // } else if (leftPositionIsAvailable && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = leftPosition;
    //     lastMoviment = 'left';
    //     console.log("5");        
    // } else if (!rightPositionIsWall && finished === false && lastMoviment != 'left') {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = rightPosition;
    //     lastMoviment = 'right';
    //     console.log("6");
    // } else if (!downPositionIsWall && finished === false && lastMoviment != 'up') {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = downPosition;
    //     lastMoviment = 'down';
    //     console.log("7");    
    // } else if (!leftPositionIsWall && finished === false && lastMoviment != 'right') {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = leftPosition;
    //     lastMoviment = 'left';
    //     console.log("8");
    // } else if (!upPositionIsWall && lastMoviment != 'up' && lastMoviment != 'down'  && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = upPosition;
    //     lastMoviment = 'up';
    //     console.log("9");
    // } else if (!rightPositionIsWall && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = rightPosition;
    //     lastMoviment = 'right';
    //     console.log("11");    
    // } else if (!upPositionIsWall && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = upPosition;
    //     lastMoviment = 'up';
    //     console.log("12");   
    // } else if (!downPositionIsWall && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = downPosition;
    //     lastMoviment = 'down';
    //     console.log("10");    
    // } else if (!leftPositionIsWall && finished === false) {
    //     path.push(currentPosition);
    //     currentPosition.visited = true;
    //     currentPosition = leftPosition;
    //     lastMoviment = 'left';
    //     console.log("13");   
    // }

    // console.log(path);

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